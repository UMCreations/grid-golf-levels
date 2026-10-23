# Grid Golf Community Levels

Public repository for levels created with the Grid Golf browser editor.

## Repository layout

- `schema/level.schema.json` defines level JSON format version 1.
- `schema/catalog.schema.json` defines the game-facing catalog format.
- `levels/pending/` is for submitted levels awaiting review.
- `levels/published/classic/` and `levels/published/adventure/` hold approved levels.
- `catalog.json` lists only approved, playable levels and points to their JSON files.

The game must use `catalog.json` as the allowlist. A JSON file under `levels/pending/` is not published to the game.

## Level format

Each level JSON file must validate against `schema/level.schema.json`. IDs must be unique across both game modes. Keep published IDs and paths stable so saved progress and shared links continue to work.

## Submissions and review

Account-free submissions through the browser editor are planned but are not enabled yet. Before intake opens, the project will publish submission terms and configure validation and review. Do not put personal or private information in level metadata.

Approved levels are moved to the appropriate `levels/published/` folder. A serialized GitHub Actions workflow then opens or updates one catalog-sync pull request generated from all currently published files. Merge that catalog-sync pull request to make the levels available in the game. Pending submissions are not playable.

The catalog workflow uses the repository's built-in `GITHUB_TOKEN`. In **Settings → Actions → General → Workflow permissions**, allow read and write permissions and enable **Allow GitHub Actions to create and approve pull requests**. No additional secrets are required.
