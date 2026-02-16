# Everything Claude Code

## What This Is

A collection of production-ready Claude Code configs: agents, skills, hooks, commands, rules, and MCP configurations. Created by @affaanmustafa (Anthropic hackathon winner). This repo is both a reference/template for other users AND a working config collection.

## Repo Structure

```
agents/           - Subagent definitions (planner, architect, tdd, code-reviewer, etc.)
skills/           - Workflow definitions and domain knowledge (TDD, security, patterns)
commands/         - Slash commands (/tdd, /plan, /e2e, /code-review, /build-fix, etc.)
rules/            - Always-follow guidelines (security, style, testing, git, performance)
hooks/            - Event-driven automations (hooks.json + memory-persistence, strategic-compact)
mcp-configs/      - MCP server configs (GitHub, Supabase, Vercel, Railway, etc.)
plugins/          - Plugin ecosystem docs
examples/         - Example CLAUDE.md, user-CLAUDE.md, statusline.json
contexts/         - Context files
mmoney_cli/       - Monarch Money CLI (Python) - forked from mmoney-cli, shares MCP auth
tests_mmoney/     - Tests for the Monarch Money CLI
```

## Recent Work (Session Context)

### Monarch Money CLI (`mmoney_cli/`)
- Added a Python CLI (`mmoney_cli/`) forked from mmoney-cli
- Shares authentication with the Monarch Money MCP server
- Has its own test suite in `tests_mmoney/`
- Installed via `pyproject.toml` as `monarch-cli`

### Hooks Added
- **strategic-compact** - Smart context compaction hook
- **memory-persistence** - Persists learnings across sessions
- Both registered in `hooks/hooks.json`

### Other Recent Additions
- Continuous learning skill (`skills/continuous-learning/`)
- Strategic compact skill (`skills/strategic-compact/`)
- MCP config for Monarch Money (`mcp-configs/mcp-servers.json`)
- `.gitignore` for Python artifacts, env files, editor files

## Key Commands

```bash
# Run Monarch CLI tests
cd /home/user/everything-claude-code && python -m pytest tests_mmoney/

# Install the CLI locally
pip install -e .
```

## Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Markdown files for all config definitions (agents, skills, commands, rules)
- JSON for hooks and MCP server configs
- No hardcoded secrets - use `YOUR_*_HERE` placeholders in configs

## Branch

- Working branch: `claude/new-project-setup-SJjFj`
- All work pushed and clean as of last session
