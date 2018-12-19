import SettingsRepository from "../data/settingsRepository";
import Setting from "../models/setting";

export default class ConfigController {
    settingsRepo: SettingsRepository;

    constructor(settingsRepo: SettingsRepository) {
        this.settingsRepo = settingsRepo;
    }

    set(key: string, value: string): Promise<Setting | null> {
        return this.settingsRepo.createOrUpdate({key, value});
    }
}