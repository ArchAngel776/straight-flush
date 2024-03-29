import { resolve } from "path"

import WorkSpace from "@components/WorkSpace"

import root from "@hooks/root"

import Command from "@core/Command"


export default abstract class MigrationCommand extends Command
{
    public static MIGRATIONS_DIR = "migrations"
    public static MIGRATION_PREFIX = "Migration"

    protected path: string

    protected migrationDir: WorkSpace

    public constructor()
    {
        super()
        this.path = resolve(root(), MigrationCommand.MIGRATIONS_DIR)
        this.migrationDir = new WorkSpace(this.path)
    }

    public check(): boolean 
    {
        return this.migrationDir.isWorkSpace()
    }
}