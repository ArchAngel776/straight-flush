import { ObjectId } from "mongodb"

import MigrationSchema from "@data/interfaces/MigrationSchema"

import Connection from "@components/database/Connection"
import MigrationHelper from "@helpers/MigrationHelper"


test("Add testing migration", async () => 
{
    const result = await Connection.getConnection().make(db => db.collection<MigrationSchema>(MigrationHelper.MIGRATIONS_COLLECTION).insertOne({ 
        migration_name: "test_foo",
        created_at: new Date
    }))
    expect(result.insertedId).toBeInstanceOf(ObjectId)
})

test("Check if new added migration exists", async () =>
{
    const result = await Connection.getConnection().make(db => db.collection<MigrationSchema>(MigrationHelper.MIGRATIONS_COLLECTION).findOne({
        migration_name: "test_foo"
    }))
    expect(result).not.toBeNull()
    expect(result?.migration_name).toEqual("test_foo")
})

test("Change test migration name", async () =>
{
    const result = await Connection.getConnection().make(db => db.collection<MigrationSchema>(MigrationHelper.MIGRATIONS_COLLECTION).findOneAndUpdate(
        { migration_name: "test_foo" }, 
        { $set: { migration_name: "test_bar" }}, 
        { returnDocument: "after" }
    ))
    expect(result.value).not.toBeNull()
    expect(result.value?.migration_name).toEqual("test_bar")
})

test("Remove testing migration", async () =>
{
    const result = await Connection.getConnection().make(db => db.collection<MigrationSchema>(MigrationHelper.MIGRATIONS_COLLECTION).deleteOne({
        migration_name: "test_bar"
    }))
    expect(result.deletedCount).toEqual(1)
})

test("Check if testing migration was deleted", async () =>
{
    const result = await Connection.getConnection().make(db => db.collection<MigrationSchema>(MigrationHelper.MIGRATIONS_COLLECTION).findOne({
        migration_name: "test_bar"
    }))
    expect(result).toBeNull()
})