# Definition Version Lifecycle

Workflow definitions are the stable business identity. Definition versions hold design revisions and lifecycle status.

Observed version operations include:

- list versions for a definition;
- create a draft, optionally from a source version;
- edit the draft in the designer;
- publish a draft;
- delete an unpublished draft;
- archive a non-current history version;
- view a published or archived version read-only.

Keep `publishedVersionId`, version status, version name, and change summary consistent with backend responses. Do not infer that the highest version number is published.

Before publishing, save the latest graph through the established service flow. After create, publish, archive, or delete, reload both version data and definition metadata.

Require confirmation for publish, archive, and delete operations. Do not allow a UI shortcut to mutate a non-draft design.
