namespace TestApp.Services.Events.InstallStateChanged
{
    // NB: Keep in sync with frontend.
    public enum InstallStateType
    {
        PrepareToInstall = 0,
        CheckingForUpdates = 1,
        Download = 2,
        Install = 3,
        Launch = 4,
        Paused = 5,
        Complete = 6,
        Cancelled = 7,
        Failed = -1
    }
}