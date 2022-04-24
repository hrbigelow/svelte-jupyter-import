<script>
  import JupyterContent from './example.md';
</script>

<article>
  <h1 class='title'>My Article</h1>
  <JupyterContent/>
</article>

<style>

.title {
  font-size: 40px; 
  font-weight: 700;
  line-height: 1.1em;
  margin: 0 0 0.5rem;
}

@supports not (display: grid) {
  article
  {
    display: block;
    padding: 8px;
  }
}

article {
  display: grid;
  justify-items: stretch;
  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];
  grid-column-gap: 8px;
}

article {
  /* contain: layout style; */
}

@media(min-width: 768px) {
  article {
    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];
    grid-column-gap: 16px;
    font-size: 16px;
  }
}

@media(min-width: 1000px) {
  article {
    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];
    grid-column-gap: 16px;
  }
}

@media(min-width: 1180px) {
  article {
    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];
    grid-column-gap: 32px;
    font-size: 1.06rem;
    line-height: 1.7em;
  }
}

:global(article *) {
  grid-column: text;
}


:global(figcaption) {
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  line-height: 1.5em;
}

:global(html) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
}

</style>

