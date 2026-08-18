from whitenoise.storage import CompressedManifestStaticFilesStorage


class StaticFilesStorage(CompressedManifestStaticFilesStorage):
    """Keep development/tests usable before `collectstatic` creates a manifest."""

    manifest_strict = False
