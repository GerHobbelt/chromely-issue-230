namespace TestApp.Services.Events.InstallStateChanged
{
    public class InstallState
    {
        public string GameId { get; set; }
        public InstallStateType Type { get; set; }
        public decimal ProgressPercent { get; set; }
    }
}