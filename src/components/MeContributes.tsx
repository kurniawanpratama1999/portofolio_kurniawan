import type { Contribution, ContributionWeek } from '@/lib/useRepository'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,

} from "@/components/ui/tooltip"

// const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

const MeContributes = ({ datas }: { datas: Contribution }) => {
    const weeks: ContributionWeek[] = datas?.contribution_week as ContributionWeek[] ?? [];
    return weeks.length > 0 && (
        <section id="contributes" className='container mx-auto'>
            <h2 className="text-2xl font-bold mb-4 text-center underline text-emerald-600">My Contributes</h2>
            <div className="flex w-full mx-auto mb-3 justify-center overflow-x-auto">
                {weeks.map((week, iweek) => <div key={'week' + iweek}>
                    <div className='text-xs text-center m-1'>{iweek + 1}</div>
                    <div>
                        {week.contributionDays?.map((day) => <Tooltip key={day.date}>
                            <TooltipTrigger>
                                <div className="size-5 rounded m-px border" style={{ backgroundColor: day?.color }}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className='text-[10px] text-center'>
                                    <p>{day.contributionCount} Contribution</p>
                                    <p>{day.date}</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>)}
                    </div>
                </div>)}
            </div>
        </section>
    )
}

export default MeContributes