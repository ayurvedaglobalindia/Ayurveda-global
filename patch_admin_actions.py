import re

with open("src/app/admin-actions.ts", "r") as f:
    content = f.read()

content = content.replace('cookies().set', '(await cookies()).set')
content = content.replace('cookies().delete', '(await cookies()).delete')
content = content.replace('cookies().get', '(await cookies()).get')

with open("src/app/admin-actions.ts", "w") as f:
    f.write(content)
