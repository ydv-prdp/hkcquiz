import { PrismaClient } from '@prisma/client'
const database = new PrismaClient();

async function main() {
    try {
        // const class10 = await database.class.create({ data: { name: 'Class 10' } });
        // const class11 = await database.class.create({ data: { name: 'Class 11' } });
        // const class12 = await database.class.findUnique({ where: { name: 'XII' } });
        // const geographySubjectData = [
        //     {
        //         name: "Geography",
        //         parts: [
        //             {
        //                 name: "PART A-Fundamental of Human Geography",
        //                 chapters: [
        //                     {
        //                         name: "Human Geography",
        //                         order: 1

        //                     },
        //                     {
        //                         name: "The World Population Density Distribution and Growth",
        //                         order: 2
        //                     },
        //                     {
        //                         name: "Human Development",
        //                         order: 3
        //                     },
        //                     {
        //                         name: "Primary Activities",
        //                         order: 4
        //                     },
        //                     {
        //                         name: "Secondary Activities",
        //                         order: 5
        //                     },
        //                     {
        //                         name: "Tertiary and Quaternary Activities",
        //                         order: 6
        //                     },
        //                     {
        //                         name: "Transport, Communication and Trade",
        //                         order: 7
        //                     },
        //                     {
        //                         name: "International Trade",
        //                         order: 8
        //                     },
        //                 ]
        //             },
        //             {
        //                 name: "PART B-India People and Economy",
        //                 chapters: [
        //                     {
        //                         name: "Population Distribution Density Growth and Composition",
        //                         order: 1

        //                     },
        //                     {
        //                         name: "Human Settlements",
        //                         order: 2
        //                     },
        //                     {
        //                         name: "Land Resources and Agriculture",
        //                         order: 3
        //                     },
        //                     {
        //                         name: "Water Resources",
        //                         order: 4
        //                     },
        //                     {
        //                         name: "Mineral And Energy Resources",
        //                         order: 5
        //                     },
        //                     {
        //                         name: "Planning and Sustainable Development in Indian Context",
        //                         order: 6
        //                     },
        //                     {
        //                         name: "Transport and Communication",
        //                         order: 7
        //                     },
        //                     {
        //                         name: "International Trade",
        //                         order: 8
        //                     },
        //                     {
        //                         name: "Geographical Perspective on selected issues and problems",
        //                         order: 9
        //                     },

        //                 ]

        //             }
        //         ],
        //     },
        // ]
        // const computerSubjectDataXII = [
        //     {
        //         name: "Computer Science",
        //         parts: [
        //             {
        //                 name: "Part A",
        //                 chapters: [
        //                     {
        //                         name: "Exception Handling in Python",
        //                         order: 1

        //                     },
        //                     {
        //                         name: "File Handling in Python",
        //                         order: 2
        //                     },
        //                     {
        //                         name: "Stack",
        //                         order: 3
        //                     },
        //                     {
        //                         name: "Queue",
        //                         order: 4
        //                     },
        //                     {
        //                         name: "Sorting",
        //                         order: 5
        //                     },
        //                     {
        //                         name: "Searching",
        //                         order: 6
        //                     },
        //                     {
        //                         name: "Understanding Data",
        //                         order: 7
        //                     },
        //                     {
        //                         name: "Database Concepts",
        //                         order: 8
        //                     },
        //                     {
        //                         name: "Structured Query Language (SQL)",
        //                         order: 9
        //                     },   
        //                     {
        //                         name: "Computer Networks",
        //                         order: 10
        //                     },   
        //                     {
        //                         name: "Data Communication",
        //                         order: 11
        //                     },   
        //                     {
        //                         name: "Security Aspects",
        //                         order: 12
        //                     },   
        //                     {
        //                         name: "Project Based Learning",
        //                         order: 13
        //                     }, 
        //                 ]
        //             },
        //         ],
        //     },
        // ]


        // const response = await database.$transaction(
        //     computerSubjectDataXII.map((subject) =>
        //         database.subject.upsert({
        //             where: { name: subject.name },
        //             update: {},
        //             create: {
        //                 name: subject.name,
        //                 parts:{
        //                     create:subject.parts.map((part)=>({
        //                         name:part.name,
        //                         chapters:{
        //                             create:part.chapters.map((chapter)=>({
        //                                 name:chapter.name,
        //                                 order:chapter.order
        //                             }))
        //                         }
        //                     }))
        //                 },
        //                 class: { connect: { id: class12?.id } }
        //             },
        //         })
        //     )
        // );
        console.log("success")

        const chapterId = 'dc9a54b1-7e0e-4cdd-81f6-a472e04b5530';
        const questionsForGeoPartAChapterWorldPopulation = [
            {
                text: 'What is the capital of France?',
                options: [
                  { text: 'Berlin', isCorrect: false },
                  { text: 'Paris', isCorrect: true },
                  { text: 'London', isCorrect: false },
                  { text: 'Rome', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              {
                text: 'Who painted the Mona Lisa?',
                options: [
                  { text: 'Leonardo da Vinci', isCorrect: true },
                  { text: 'Michelangelo', isCorrect: false },
                  { text: 'Raphael', isCorrect: false },
                  { text: 'Caravaggio', isCorrect: false },
                ],
              },
              // Add 8 more questions...
              {
                text: 'What is the largest planet in our solar system?',
                options: [
                  { text: 'Earth', isCorrect: false },
                  { text: 'Saturn', isCorrect: false },
                  { text: 'Jupiter', isCorrect: true },
                  { text: 'Uranus', isCorrect: false },
                ],
              },
        ]
        const quiz = await database.quiz.create({
            data: {
              name: 'Human Development',
              chapter: { connect: { id: chapterId } },
            },
          });

        for (const question of questionsForGeoPartAChapterWorldPopulation) {
            const createdQuestion = await database.question.create({
              data: {
                text: question.text,
                quiz: { connect: { id: quiz.id } },
                options: {
                  create: question.options.map((option) => ({
                    text: option.text,
                    isCorrect: option.isCorrect,
                  })),
                },
              },
            });
          }
        } 
     catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect();
    }
}

main();