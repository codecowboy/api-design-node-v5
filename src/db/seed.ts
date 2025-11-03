import {db} from './connection.ts'
import {users, habits, entries, tags, habitTags} from './schema.ts'

const seed = async () => {
    console.log('Starting database seed...')

    try {
        console.log('Clearing existing data ...')
        await db.delete(entries)
        await db.delete(habitTags)
        await db.delete(habits)
        await db.delete(tags)
        await db.delete(users)

        console.log('Creating demo users ...')
        const [demoUser] = await db.insert(users).values({
            email: 'demo@app.com',
            password: 'password',
            firstName: 'Demo',
            lastName: 'User',
            username: 'demouser'

        })
        .returning()

        console.log('Creating Tags... ')
        const [healthTag] = await db.insert(tags).values({
            name: 'Health',
            colour: '#fefefe',
        })
        .returning()

        const [exerciseHabit] = await db.insert(habits).values({
            userId: demoUser.id,
            name: 'exercise',
            description: 'daily workout',
            frequency: 'daily',
            targetCount: 1,

        })
        .returning()

        await db.insert(habitTags).values({
            habitId: exerciseHabit.id,
            tagId: healthTag.id,
        })



        console.log('Adding completion entries')

        const today = new Date()
        today.setHours(12,0,0,0)

        for (let i = 0; i < 7; i++) {

            const date = new Date(today)
            date.setDate(date.getDate() - i)

            await db.insert(entries).values({
                habitId: exerciseHabit.id,
                completionDate: date,
                
            })

        }

        console.log('Database seeded successfully')
        console.log('User credentials:')
        console.log(`email: ${demoUser.email}`)
        console.log(`username: ${demoUser.username}`)
        console.log(`password: ${demoUser.password}`)




    } catch (e) {
        
        console.error('seed failed',e)
        process.exit(1)
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    seed()
    .then(() => process.exit(0))
    .catch(e => process.exit(1))
}

export default seed