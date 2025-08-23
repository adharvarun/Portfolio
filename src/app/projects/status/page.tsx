'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { FaArrowLeft, FaLink } from 'react-icons/fa6';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectStatus = {
    title: string;
    url: string;
    status: 'Checking' | 'Online' | 'Offline';
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

export default function Page() {
    const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjectsAndCheckStatus = async () => {
            try {
                const projects = await client.fetch(
                    `*[_type == "projects"] | order(_createdAt desc){ title, link }`
                );

                const initialStatuses = projects
                    .filter((p: any) => p.link && p.title)
                    .map((p: any) => ({
                        title: p.title,
                        url: p.link,
                        status: 'Checking' as const,
                    }));

                setStatuses(initialStatuses);

                const results = await Promise.all(
                    initialStatuses.map(async ({ title, url }) => {
                        try {
                            await fetch(url, { method: 'GET', mode: 'no-cors' });
                            return { title, url, status: 'Online' as const };
                        } catch {
                            return { title, url, status: 'Offline' as const };
                        }
                    })
                );

                setStatuses(results);
                setTimeout(() => setIsLoading(false), 600);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchProjectsAndCheckStatus();
    }, []);

    const handleRefresh = async () => {
        setIsLoading(true);

        try {
            const projects = await client.fetch(
                `*[_type == "projects"] | order(_createdAt desc){ title, link }`
            );

            const initialStatuses = projects
                .filter((p: any) => p.link && p.title)
                .map((p: any) => ({
                    title: p.title,
                    url: p.link,
                    status: 'Checking' as const,
                }));

            setStatuses(initialStatuses);

            const results = await Promise.all(
                initialStatuses.map(async ({ title, url }) => {
                    try {
                        await fetch(url, { method: 'GET', mode: 'no-cors' });
                        return { title, url, status: 'Online' as const };
                    } catch {
                        return { title, url, status: 'Offline' as const };
                    }
                })
            );

            setStatuses(results);
            setTimeout(() => setIsLoading(false), 600);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 transition-colors">
            <section className="max-w-2xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
                    >
                        <FaArrowLeft />
                        Back to Projects
                    </Link>

                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900">
                        My Projects&apos; Online Status
                    </h1>
                    <p className="text-lg text-gray-600 mb-3">
                        Check the current online status of my projects below.
                    </p>
                    <button
                        onClick={handleRefresh}
                        className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-900 transition mb-8 hover:cursor-pointer"
                    >
                        Refresh Status
                    </button>
                </motion.div>

                <AnimatePresence>
                    {isLoading ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-gray-500"
                        >
                            Checking project statuses...
                        </motion.p>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            {statuses.map(({ title, url, status }) => (
                                <motion.div
                                    key={url}
                                    variants={itemVariants}
                                    className="flex items-center justify-between bg-white border border-zinc-200 p-5 rounded-xl shadow transition"
                                >
                                    <span className="break-all">{title}</span>
                                    <div className="flex justify-center items-center gap-2">
                                        <Link href={url} target="_blank" rel="noopener noreferrer">
                                            <FaLink className="text-blue-500 hover:text-blue-700" />
                                        </Link>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold transition
                                        ${
                                            status === 'Online'
                                                ? 'bg-green-100 text-green-800'
                                                : status === 'Offline'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }
                                    `}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}