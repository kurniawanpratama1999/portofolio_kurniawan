import useFetchRepo, { type Contribution, type RepoAndCommit } from "@/lib/useRepository";
import MeHero from "@/components/MeHero";
import MeRepository from "@/components/MeRepository";
import MeContributes from "@/components/MeContributes";

const Home = () => {
  const repos = ['LARAPOS425', 'LAUNDRY425', 'miesabi-laravel10', 'portofolio_kurniawan', 'pos-express', 'pos-vue']
  const { data, loading } = useFetchRepo(repos)
  const repoAndCommit: RepoAndCommit[] = data?.repoAndCommit ?? [];
  const contribution: Contribution = data?.contribution as Contribution;
  return (
    <>
      <MeHero />
      <MeContributes datas={contribution} />
      <MeRepository repos={repoAndCommit} loading={loading} repoNames={repos.sort((a, b) => b.localeCompare(a))} />
    </>
  )
}

export default Home