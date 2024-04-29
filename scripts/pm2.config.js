

const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const VAULT = path.join(ROOT, "AI_Employee_Vault");
const PYTHON = process.env.PYTHON_CMD || "python3";

function envOrDefault(key, def) {
  return process.env[key] || def;
}

module.exports = {
  apps: [

    {
      name: "orchestrator",
      script: PYTHON,
      args: `orchestrator.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 5000,
      max_restarts: 10,
      autorestart: true,
      watch: false,
      env: {
        VAULT_PATH: VAULT,
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
        SMTP_HOST: envOrDefault("SMTP_HOST", "smtp.gmail.com"),
        SMTP_PORT: envOrDefault("SMTP_PORT", "587"),
        SMTP_USER: envOrDefault("SMTP_USER", ""),
        SMTP_PASSWORD: envOrDefault("SMTP_PASSWORD", ""),
        SMTP_FROM_NAME: envOrDefault("SMTP_FROM_NAME", "AI Employee"),
        CLAUDE_CMD: envOrDefault("CLAUDE_CMD", "claude"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "orchestrator-error.log"),
      out_file: path.join(ROOT, "logs", "orchestrator-out.log"),
    },

    {
      name: "watchdog",
      script: PYTHON,
      args: `scripts/watchdog.py --vault ${VAULT} --interval 60`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "watchdog-error.log"),
      out_file: path.join(ROOT, "logs", "watchdog-out.log"),
    },

    {
      name: "fs-watcher",
      script: PYTHON,
      args: `watchers/filesystem_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 3000,
      max_restarts: 20,
      autorestart: true,
      watch: false,
      env: {
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "fs-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "fs-watcher-out.log"),
    },

    {
      name: "gmail-watcher",
      script: PYTHON,
      args: `watchers/gmail_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 5000,
      max_restarts: 10,
      autorestart: true,
      watch: false,
      env: {
        GMAIL_CREDENTIALS_PATH: envOrDefault("GMAIL_CREDENTIALS_PATH", path.join(ROOT, "watchers/credentials.json")),
        GMAIL_TOKEN_PATH: envOrDefault("GMAIL_TOKEN_PATH", path.join(ROOT, "watchers/token.json")),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "gmail-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "gmail-watcher-out.log"),
    },

    {
      name: "linkedin-watcher",
      script: PYTHON,
      args: `watchers/linkedin_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        LINKEDIN_EMAIL: envOrDefault("LINKEDIN_EMAIL", ""),
        LINKEDIN_PASSWORD: envOrDefault("LINKEDIN_PASSWORD", ""),
        LINKEDIN_SESSION_PATH: envOrDefault("LINKEDIN_SESSION_PATH", path.join(ROOT, ".linkedin_session")),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "linkedin-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "linkedin-watcher-out.log"),
    },


    {
      name: "whatsapp-watcher",
      script: PYTHON,
      args: `watchers/whatsapp_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        WHATSAPP_SESSION_PATH: envOrDefault("WHATSAPP_SESSION_PATH", path.join(ROOT, ".whatsapp_session")),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "whatsapp-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "whatsapp-watcher-out.log"),
    },


    {
      name: "twitter-watcher",
      script: PYTHON,
      args: `watchers/twitter_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        TWITTER_SESSION_PATH: envOrDefault("TWITTER_SESSION_PATH", path.join(ROOT, ".twitter_session")),
        TWITTER_HANDLE: envOrDefault("TWITTER_HANDLE", ""),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "twitter-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "twitter-watcher-out.log"),
    },


    {
      name: "facebook-watcher",
      script: PYTHON,
      args: `watchers/facebook_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        FACEBOOK_SESSION_PATH: envOrDefault("FACEBOOK_SESSION_PATH", path.join(ROOT, ".facebook_session")),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "facebook-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "facebook-watcher-out.log"),
    },


    {
      name: "instagram-watcher",
      script: PYTHON,
      args: `watchers/instagram_watcher.py --vault ${VAULT}`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      env: {
        INSTAGRAM_SESSION_PATH: envOrDefault("INSTAGRAM_SESSION_PATH", path.join(ROOT, ".instagram_session")),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "instagram-watcher-error.log"),
      out_file: path.join(ROOT, "logs", "instagram-watcher-out.log"),
    },

    {
      name: "vault-sync",
      script: PYTHON,
      args: `scripts/vault_sync.py --vault ${VAULT} --interval 300`,
      cwd: ROOT,
      interpreter: "none",
      restart_delay: 10000,
      max_restarts: 10,
      autorestart: true,
      watch: false,
      env: {
        VAULT_PATH: VAULT,
        GIT_VAULT_BRANCH: envOrDefault("GIT_VAULT_BRANCH", "main"),
        VAULT_SYNC_INTERVAL: envOrDefault("VAULT_SYNC_INTERVAL", "300"),
        AGENT_MODE: envOrDefault("AGENT_MODE", "local"),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "vault-sync-error.log"),
      out_file: path.join(ROOT, "logs", "vault-sync-out.log"),
    },




    {
      name: "weekly-audit",
      script: PYTHON,
      args: `scripts/weekly_audit.py --vault ${VAULT} --period 7`,
      cwd: ROOT,
      interpreter: "none",
      autorestart: false,   
      watch: false,
      env: {
        VAULT_PATH: VAULT,
        ODOO_URL: envOrDefault("ODOO_URL", ""),
        ODOO_DB: envOrDefault("ODOO_DB", "odoo"),
        ODOO_USERNAME: envOrDefault("ODOO_USERNAME", "admin"),
        ODOO_PASSWORD: envOrDefault("ODOO_PASSWORD", "admin"),
        DRY_RUN: envOrDefault("DRY_RUN", "false"),
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: path.join(ROOT, "logs", "weekly-audit-error.log"),
      out_file: path.join(ROOT, "logs", "weekly-audit-out.log"),
    },
  ],
};
