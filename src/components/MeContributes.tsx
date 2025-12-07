import type { Contribution, ContributionWeek } from '@/lib/useRepository'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,

} from "@/components/ui/tooltip"

const MeContributes = ({ datas }: { datas: Contribution }) => {
    const weeks: ContributionWeek[] = datas?.contribution_week as ContributionWeek[] ?? [];
    const maxDays = weeks[0]?.contributionDays?.length ?? 7;
    const monthCols: { name: string, colspan: number }[] = []

    for (const week of weeks) {
        const strDate: string = week.contributionDays ? week.contributionDays[0].date as string : ''
        const date = new Date(strDate)
        const month = ["Jan", 'Feb', "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"][date.getMonth()]
        const year = date.getFullYear().toString().substring(2);
        const findMonthYear = monthCols.find(m => m.name === `${month} ${year}`)
        if (findMonthYear) {
            findMonthYear.colspan += 1
        } else {
            monthCols.push({
                name: `${month} ${year}`,
                colspan: 1
            })

        }
    }
    return weeks.length > 0 && (
        <section id="contributes" className='container mx-auto'>
            <h2 className="text-2xl font-bold mb-4 text-center underline text-emerald-600">My {datas.total_contribution} Contributes</h2>
            <div className="overflow-x-auto">
                <table className='w-fit mx-auto'>
                    <thead>
                        <tr>
                            <th></th>
                            {monthCols.map((monthCol, indexW) => {
                                return <th key={`week-${indexW}`} colSpan={monthCol.colspan} className="px-px text-xs text-left text-nowrap">
                                    {monthCol.name}
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: maxDays }).map((_, dayIndex) => (
                            <tr key={`day-${dayIndex}`}>
                                <td className="text-[10px] py-px pl-px pr-2 text-right">
                                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Mgg"][dayIndex]}
                                </td>
                                {weeks.map((week, wIndex) => {
                                    const day = week.contributionDays?.[dayIndex];
                                    return (
                                        <td key={`cell-${wIndex}-${dayIndex}`} className="px-px pt-px">
                                            <Tooltip key={day?.date}>
                                                <TooltipTrigger>
                                                    <div
                                                        style={{ backgroundColor: day?.color }}
                                                        className="size-3 border border-black rounded"
                                                    ></div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className='text-[10px] text-center'>
                                                        <p>{day?.contributionCount} Contribution</p>
                                                        <p>{day?.date}</p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default MeContributes