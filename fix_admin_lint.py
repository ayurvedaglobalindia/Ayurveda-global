with open("src/app/(public)/admin/page.tsx", "r") as f:
    content = f.read()

content = content.replace('  }, [loadDashboardData]); // Initial load', '    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []); // Initial load')

with open("src/app/(public)/admin/page.tsx", "w") as f:
    f.write(content)
