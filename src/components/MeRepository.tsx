import type { RepoAndCommit } from '@/lib/useRepository'
import * as motion from "motion/react-client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import { GoRepoForked } from "@react-icons/all-files/go/GoRepoForked";
import { FaRegStar } from "@react-icons/all-files/fa/FaRegStar";
import { FiFolderPlus } from "@react-icons/all-files/fi/FiFolderPlus";
import { GoGitCommit } from "@react-icons/all-files/go/GoGitCommit";
import type { IconType } from '@react-icons/all-files/lib';
import { cn } from '@/lib/utils';

const RepoSkeleton = ({ datas }: { datas: string[] }) => {
    return [...datas].map((v, k) => <Card key={`${v}-${k}`}>
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
}

const IconCardHeader = ({ Icon, label }: { Icon: IconType, label: string | number }) => {
    return <div className="flex items-center gap-1">
        <Icon />
        <span>{label}</span>
    </div>
}
const IconCardFooter = ({ Icon, label, color }: { Icon: IconType, label: string | number, color: string }) => {
    return <Badge className={cn('flex items-center gap-1', color)}>
        <Icon />
        <span>{label}</span>
    </Badge>
}

const Repo = ({ datas, repoNames }: { datas: RepoAndCommit[], repoNames: string[] }) => {
    return datas.map((v: RepoAndCommit, k: number) =>
        <motion.a key={v.created_at + "-" + k} whileHover={{ scale: 1.1 }} target="_blank" href={`https://github.com/kurniawanpratama1999/${repoNames[k]}`}>
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between font-normal">
                        <h3 className="font-bold capitalize">{repoNames[k]}</h3>
                        <div className="flex items-center gap-3 justify-end">
                            <IconCardHeader Icon={GoRepoForked} label={v.forks ?? 0} />
                            <IconCardHeader Icon={FaRegStar} label={v.stars ?? 0} />
                        </div>
                    </CardTitle>
                    <CardDescription>
                        <p className="line-clamp-3">{v.description}</p>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-start justify-between mt-auto">
                    <IconCardFooter Icon={FiFolderPlus} label={v.created_at ?? ''} color='bg-emerald-400' />
                    <IconCardFooter Icon={GoGitCommit} label={v.last_commit ?? ''} color='bg-indigo-400' />
                </CardFooter>
            </Card>

        </motion.a>
    )
}

const MeRepository = ({ repoNames, repos, loading }: { repoNames: string[], repos: RepoAndCommit[], loading: boolean }) => {
    return repos.length > 0 && (<section className="w-full" id="repo">
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4 text-center underline text-emerald-600">My Repositories</h2>
            <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 grid-cols-3 gap-5 lg:gap-10">
                {loading ? <RepoSkeleton datas={repoNames} /> : <Repo datas={repos} repoNames={repoNames} />}
            </div>
        </div>
    </section>)
}

export default MeRepository