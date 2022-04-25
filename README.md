# Clippy ![Docker Build](https://github.com/lolPants/clippy/workflows/Docker%20Build/badge.svg)
> Automatically archive Twitch clips posted in Discord

![it looks like you're trying to archive twitch clips](./assets/readme.png)

## 🚀 Running in Production
This project uses GitHub Actions to run automated docker builds, you can find them in this repo's [Package Registry](https://github.com/lolPants/clippy/packages).

### 📝 Configuration
Clippy is configured using environment variables.

| Variable | Required | Default | Description |
| - | - | - | - |
| `TOKEN` | ✅ | n/a | Discord Bot Login Token |
| `DOWNLOAD_DIR` | ❌ | `./download` | Clip Download Directory |
