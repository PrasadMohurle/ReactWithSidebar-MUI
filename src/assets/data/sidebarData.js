// Import the icons you need
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import MailLockRoundedIcon from '@mui/icons-material/MailLockRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import GridOnIcon from '@mui/icons-material/GridOn';


export const sidebarData = [
    {
      "title": "Main",
      "items": [
        {
          "icon": <HomeRoundedIcon/>,
          "text": "Home",
          "link": "/"
        },
        {
          "icon": <SpaceDashboardRoundedIcon/>,
          "text": "Dashboard",
          "link": "/dashboard"
        },
        {
          "icon": <HomeRoundedIcon/>,
          "text": "Users",
          "link": "/dashboard/users"
        }
      ]
    },
    {
      "title": "Plan & Schedule",
      "items": [
        {
          "icon": <ClassRoundedIcon/>,
          "text": "Plan",
          "link": "/dashboard/schedule/plan"
        },
        {
          "icon": <StyleRoundedIcon/>,
          "text": "Plan Version",
          "link": "/dashboard/schedule/plan_version"
        },
        {
          "icon": <ScheduleSendRoundedIcon/>,
          "text": "Run Schedule",
          "link": "/dashboard/schedule/run_schedule"
        }
      ]
    },
    {
      "title": "Visualisation",
      "items": [
        {
          "icon": <TodayRoundedIcon/>,
          "text": "Daily",
          "link": "/dashboard/visualisation/daily"
        },
        {
          "icon": <ScheduleRoundedIcon/>,
          "text": "Hourly",
          "link": "/dashboard/visualisation/hourly"
        },
        {
          "icon": <GridOnIcon/>,
          "text": "Excel Report",
          "link": "/dashboard/visualisation/excel"
        },
        {
          "icon": <QueryStatsRoundedIcon/>,
          "text": "Analytics",
          "link": "/dashboard/visualisation/analytics"
        }
      ]
    },
    {
      "title": "Data Management",
      "items": [
        {
          "icon": <MailLockRoundedIcon/>,
          "text": "Master Data",
          "link": "#",
          "subItems": [
            {
                "text": "Pipeline Branch Details",
                "link": "/dashboard/masterData/pipeline/pipeline_branch_details"
            },
            {
                "text": "Pipeline Branch Plug Quantity",
                "link": "/dashboard/masterData/pipeline/pipeline_branch_plug_quantity"
            },
            {
                "text": "Product Coastal Schedules",
                "link": "/dashboard/masterData/product/product_coastal_schedules"
            },
            {
                "text": "Product Demand Detail",
                "link": "/dashboard/masterData/product/product_demand_detail"
            }
          ]
        },
        {
          "icon": <ReportRoundedIcon/>,
          "text": "Report",
          "link": "#"
        }
      ]
    },
    {
      "title": "User",
      "items": [
        {
          "icon": <PermContactCalendarRoundedIcon/>,
          "text": "Profile",
          "link": "#"
        },
        {
          "icon": <LogoutRoundedIcon/>,
          "text": "Logout",
          "link": "#"
        }
      ]
    }
  ]
  