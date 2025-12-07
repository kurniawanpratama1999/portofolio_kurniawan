import React from 'react'
import * as motion from "motion/react-client"
import { Badge } from "@/components/ui/badge"
import { FaLaravel } from "@react-icons/all-files/fa/FaLaravel";
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { FaVuejs } from "@react-icons/all-files/fa/FaVuejs";
import { FaNodeJs } from "@react-icons/all-files/fa/FaNodeJs";
import { FaFileExcel } from "@react-icons/all-files/fa/FaFileExcel";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaCss3 } from "@react-icons/all-files/fa/FaCss3";
import { SiTailwindcss } from "@react-icons/all-files/si/SiTailwindcss";
import { SiBootstrap } from "@react-icons/all-files/si/SiBootstrap";
import { SiMysql } from "@react-icons/all-files/si/SiMysql";

const HeroImage = (): React.ReactNode => {
    return <motion.div initial={{ x: '100%' }} whileInView={{ x: '0%' }} className="border aspect-square rounded-4xl bg-slate-300 shadow w-full max-w-130 mx-auto relative overflow-hidden max-lg:order-1">
        <img src="/me-black-and-white-at-ppkd.jpg" alt="me-at-ppkd" className="w-full absolute scale-150 -top-36" />
    </motion.div>
}


const hardSkill = {
    framework: [
        { name: 'Laravel', icon: FaLaravel, color: 'bg-red-300 text-red-900' },
        { name: 'NodeJs', icon: FaNodeJs, color: 'bg-green-300 text-green-900' },
        { name: 'ReactJs', icon: FaReact, color: 'bg-blue-300 text-blue-900' },
        { name: 'VueJs', icon: FaVuejs, color: 'bg-emerald-300 text-emerald-900' },
    ],
    styling: [
        { name: 'css', icon: FaCss3, color: 'bg-indigo-300 text-indigo-900' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'bg-blue-300 text-blue-900' },
        { name: 'Bootstrap', icon: SiBootstrap, color: 'bg-purple-300 text-purple-900' },
    ],
    database: [{ name: 'Mysql', icon: SiMysql, color: 'bg-yellow-300 text-yellow-900' }],
    teams: [
        { name: 'Git/Github', icon: FaGithub, color: 'bg-neutral-300 text-neutral-900' },
        { name: 'G.Spreadsheet-Ms.Excel', icon: FaFileExcel, color: 'bg-emerald-300 text-emerald-900' },
        { name: 'G.Slide-Ms.PowerPoint', icon: FaFileExcel, color: 'bg-amber-300 text-amber-900' },
        { name: 'G.Docs-Ms.Word', icon: FaFileExcel, color: 'bg-blue-300 text-blue-900' },
    ],
}
const HeroDescription = (): React.ReactNode => {
    const dropdownHardSkill = Object.entries(hardSkill);

    return <motion.div initial={{ x: '-100%' }} whileInView={{ x: '0%' }} className="content-center max-lg:order-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Hello Everyone 👋</h1>
        <p className="text-2xl lg:text-3xl font-bold">I am Kurniawan Pratama</p>
        <p className="text-neutral-500">
            Sudah lebih dari 1 tahu saya beraktivitas dengan bahasa pemrograman dan saya sangat menyukainya, walaupun latar belakang pendidikan saya adalah Sarjana Manajemen, tetapi membuat kode mengaktifkan dopamine di otak saya, karena didalamnya terdapat masalah-masalah yang harus saya pecahkan, dan ketika masalah itu terpecahkan, makna yang sebernarnya dari coding saya dapatkan, yaitu kesanangan, belajar, dan berkontribusi.
        </p>

        {dropdownHardSkill.map(([category, skills]) =>
            <div key={category} className='mt-3'>
                <p className="font-bold capitalize">{category}:</p>
                <div className="flex gap-2 flex-wrap">
                    {skills.map((skill, iSkill) =>
                        <Badge key={`${skill}-${iSkill}`} className={skill.color}>
                            <skill.icon />
                            {skill.name}
                        </Badge>)}
                </div>
            </div>)}
    </motion.div>
}

const MeHero = (): React.ReactNode => {
    return <section className="w-full" id="home">
        <div className="container mx-auto min-h-screen content-center">
            <div className="grid lg:grid-cols-2 gap-10 max-lg:p-5">
                <HeroDescription />
                <HeroImage />
            </div>
        </div>
    </section>
}

export default MeHero