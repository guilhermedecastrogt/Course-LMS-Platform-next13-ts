const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Computer science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Python" },
                { name: "Dotnet" },
                { name: "TypeScript" },
                { name: "React" },
                { name: "Js" },
            ]
        })
        
        console.log("Categories seeded successfully");  
    }
    catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await db.$disconnect();
    }
}

main(); 