import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { GoRepoForked } from "@react-icons/all-files/go/GoRepoForked";
import { FaRegStar } from "@react-icons/all-files/fa/FaRegStar";
import { FiFolderPlus } from "@react-icons/all-files/fi/FiFolderPlus";
import { GoGitCommit } from "@react-icons/all-files/go/GoGitCommit";
import * as motion from "motion/react-client"
import { useEffect } from "react";

import useFetchRepo from "@/lib/useFetchRepo";
import { Skeleton } from "@/components/ui/skeleton";
import { NavLink } from "react-router";

const Hero = () => {
  return <section className="w-full">
    <div className="container mx-auto min-h-screen content-center">
      <div className="grid lg:grid-cols-2 gap-10 max-lg:p-5">
        <motion.div initial={{ x: '-100%' }} whileInView={{ x: 0 }} className="content-center max-lg:order-2">
          <h1 className="text-4xl font-bold">Hello Everyone 👋</h1>
          <p className="text-3xl font-bold">I am Kurniawan Pratama</p>
          <p className="text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita quam cumque natus quaerat exercitationem voluptates labore! Excepturi, tempore error. Commodi ipsam recusandae laudantium odit sit aut placeat rem nulla atque.</p>

          <p className="mt-3 font-bold">Framework:</p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-red-500">
              <FaLaravel />
              Laravel
            </Badge>
            <Badge className="bg-emerald-500">
              <FaNodeJs />
              NodeJs
            </Badge>
            <Badge className="bg-blue-500">
              <FaReact />
              ReactJs
            </Badge >
            <Badge className="bg-emerald-500">
              <FaVuejs />
              VueJs
            </Badge>
          </div>

          <p className="mt-3 font-bold">Styling:</p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-indigo-400">
              <FaCss3 />
              Css
            </Badge>
            <Badge className="bg-blue-500">
              <SiTailwindcss />
              Tailwind
            </Badge>
            <Badge className="bg-purple-500">
              <SiBootstrap />
              Bootstrap
            </Badge>
          </div>

          <p className="mt-3 font-bold">Database:</p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-amber-400">
              <SiMysql />
              Mysql
            </Badge>
          </div>

          <p className="mt-3 font-bold">Teams:</p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-green-500">
              <FaFileExcel />
              Excel
            </Badge>
            <Badge className="bg-neutral-500">
              <FaGithub />
              Github
            </Badge>
          </div>
        </motion.div>
        <motion.div initial={{ scale: '10%' }} whileInView={{ scale: '100%' }} className="border aspect-square rounded-4xl bg-slate-300 shadow w-full max-w-130 mx-auto relative overflow-hidden max-lg:order-1">
          <img src="/me-black-and-white-at-ppkd.jpg" alt="me-at-ppkd" className="w-full absolute scale-150 -top-36" />
        </motion.div>
      </div>
    </div>
  </section>
}

const Project = () => {
  const repos = ['LARAPOS425', 'miesabi-laravel10']
  const { data, loading } = useFetchRepo(repos)

  return <section className="w-full">
    <div className="container mx-auto pb-10">
      <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 grid-cols-3 gap-10">

        {loading ? [...repos].map(() =>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between font-normal">
                <Skeleton className="h-7 rounded-full w-3/4" />
                <div className="flex items-center gap-3 justify-end">
                  <Skeleton className="w-7 aspect-square rounded-full" />
                  <Skeleton className="w-7 aspect-square rounded-full" />
                </div>
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-full h-32 rounded-2xl" />
              </CardDescription>
              <CardFooter className="grid grid-cols-2 gap-10 items-start justify-between">
                <Skeleton className="w-full h-7 rounded-2xl" />
                <Skeleton className="w-full h-7 rounded-2xl" />
              </CardFooter>
            </CardHeader>
          </Card>)
          :
          [...data].map((v, k) =>
            <NavLink to={`https://github.com/kurniawanpratama1999/${repos[k]}`}>
              <Card key={v.created_at + "-" + k}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between font-normal">
                    <h3 className="font-bold">{repos[k]}</h3>
                    <div className="flex items-center gap-3 justify-end">
                      <div className="flex items-center gap-1">
                        <GoRepoForked />
                        <span>{v.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegStar />
                        <span>{v.stars}</span>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {v.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-start justify-between">
                  <Badge className="flex items-center gap-1 bg-emerald-400">
                    <FiFolderPlus />
                    <span>{v.created_at}</span>
                  </Badge>
                  <Badge className="flex items-center gap-1 bg-blue-400">
                    <GoGitCommit />
                    <span>{v.last_commit}</span>
                  </Badge>
                </CardFooter>
              </Card>

            </NavLink>
          )}
      </div>
    </div>
  </section>
}

const Home = () => {
  useEffect(() => {
    const fetchingGithub = async () => {
      const api = await fetch('/api/github/repo=LARAPOS425')
      const response = await api.json()
      console.log(response)
    }

    fetchingGithub()
  }, [])
  return (
    <>
      <Hero />
      <Project />
    </>
  )
}

export default Home