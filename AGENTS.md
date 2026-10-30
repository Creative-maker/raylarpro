<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history , force pushing, or rebasing/amending/squashing commits
> that are already pushed , as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shopify recommendations use a same-origin public streaming server route and request-scoped AI Gateway Responses helpers, keeping prompts and keys server-only while preserving partial output and explicit cancellation.
- Persist terminal AI access denials in the server-only gateway state table; clear the entry only after access is restored, so reloads and worker restarts cannot replay blocked requests.
