import { IconCircleDashedCheck, IconHourglassHigh, IconUserScan } from '@tabler/icons-react'
import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import MetricsCard from './MetricsCard';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../context';

const DisplayInfo = () => {
    const Navigate = useNavigate();
    const { user } = usePrivy();
    const { fetchUserRecords, records, fetchUserByEmail } = useStateContext();

    const [metrics, setMetrics] = useState({
        totalFolders: 0,
        aiPersonalizedTreatment: 0,
        totalScreenings: 0,
        completedScreenings: 0,
        pendingScreenings: 0,
        overdueScreenings: 0,
    })

    useEffect(() => {
      if (user) {
        fetchUserByEmail(user.email.address)
          .then(() => {
            console.log(records);
            const totalFolders = records.length;
            let aiPersonalizedTreatment = 0;
            let totalScreenings = 0;
            let completedScreenings = 0;
            let pendingScreenings = 0;
            let overdueScreenings = 0;
  
            records.forEach((record) => {
              if (record.kanbanRecords) {
                try {
                  const kanban = JSON.parse(record.kanbanRecords);
                  aiPersonalizedTreatment += kanban.columns.some(
                    (column) => column.title === "AI Personalized Treatment",
                  )
                    ? 1
                    : 0;
                  totalScreenings += kanban.tasks.length;
                  completedScreenings += kanban.tasks.filter(
                    (task) => task.columnId === "done",
                  ).length;
                  pendingScreenings += kanban.tasks.filter(
                    (task) => task.columnId === "doing",
                  ).length;
                  overdueScreenings += kanban.tasks.filter(
                    (task) => task.columnId === "overdue",
                  ).length;
                } catch (error) {
                  console.error("Failed to parse kanbanRecords:", error);
                }
              }
            });
  
            setMetrics({
              totalFolders,
              aiPersonalizedTreatment,
              totalScreenings,
              completedScreenings,
              pendingScreenings,
              overdueScreenings,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [user, fetchUserRecords, records]);

    const metricsData = [
        {
            title: 'Specialist Appointments Pending',
            subtitle: 'View',
            value : metrics.pendingScreenings,
            icon: IconHourglassHigh,
            onclick : () => Navigate('/appointments/pending')
        },
        {
            title: 'Treatment Progress Update',
            subtitle: 'View',
            value : `${metrics.completedScreenings}/${metrics.totalScreenings}`,
            icon: IconCircleDashedCheck,
            onclick : () => Navigate('/appointments/progress')
        },
        {
            title: 'Total Folders',
            subtitle: 'View',
            value : metrics.totalFolders,
            icon: IconCircleDashedCheck,
            onclick : () => Navigate('/folders')
        },
        {
            title: 'Total Screenings',
            subtitle: 'View',
            value : metrics.totalScreenings,
            icon: IconUserScan,
            onclick : () => Navigate('/screenings')
        },
        {
            title: 'Completed Screenings',
            subtitle: 'View',
            value : metrics.completedScreenings,
            icon: IconUserScan,
            onclick : () => Navigate('/screenings/completed')
        },
        {
            title: 'Pending Screenings',
            subtitle: 'View',
            value : metrics.pendingScreenings,
            icon: IconUserScan,
            onclick : () => Navigate('/screenings/pending')
        },
        {
            title: 'Overdue Screenings',
            subtitle: 'View',
            value : metrics.overdueScreenings,
            icon: IconUserScan,
            onclick : () => Navigate('/screenings/overdue')
        }
    ]

    return (
        <div className="flex flex-wrap gap-[26px]">
          <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
            {metricsData.slice(0, 2).map((metric) => (
              <MetricsCard key={metric.title} {...metric} />
            ))}
          </div>
    
          <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {metricsData.slice(2).map((metric) => (
              <MetricsCard key={metric.title} {...metric} />
            ))}
          </div>
        </div>
      );
}

export default DisplayInfo;