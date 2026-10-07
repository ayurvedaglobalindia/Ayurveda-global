#!/bin/bash
cat << 'INNER_EOF' > /tmp/sed_script
/const loadDashboardData = (range: DateRange = dateRange) => {/,/setAnalytics(getAnalyticsSummary(range))/c\
  const loadDashboardData = (range: DateRange = dateRange) => {\
    // 2. Load analytics for selected range\
    setAnalytics(getAnalyticsSummary(range))\
\
    // 1. Gather all real client orders\
    if (typeof window !== 'undefined') {\
      import("@/app/actions").then(m => m.getOrdersServer().then(serverOrders => {\
        let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])];\
        if (serverOrders && serverOrders.length > 0) {\
          allOrders = [...allOrders, ...serverOrders];\
        } else {\
          try {\
            const local = JSON.parse(localStorage.getItem('ayur_orders') || '[]');\
            allOrders = [...allOrders, ...local];\
          } catch {}\
        }\
        const uniqueOrders = allOrders.filter(\
          (v, i, a) => a.findIndex(t => t.id === v.id || t.orderNumber === v.orderNumber) === i\
        );\
        setOrders(uniqueOrders);\
      })).catch(() => {\
        try {\
          const local = JSON.parse(localStorage.getItem('ayur_orders') || '[]');\
          setOrders(local);\
        } catch {}\
      });\
    }\
  }
INNER_EOF
sed -i -f /tmp/sed_script src/app/\(public\)/admin/page.tsx
