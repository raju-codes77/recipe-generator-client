const fs = require('fs');
const path = 'C:/web devlop/teamProject/reciepe-generator-server/src/lib/auth.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace whatever is currently in advanced: ... with the correct version
content = content.replace(/advanced: \{[\s\S]*?emailAndPassword: \{/, `advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    }
  },
  emailAndPassword: {`);

fs.writeFileSync(path, content);
console.log("Successfully updated auth.ts");
