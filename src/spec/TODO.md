> Add all the documentation for your approach here

# My Approach

I am documenting my approach to this project here.

It should be noted that while `TODO.md` might be a great place to put one, this is not a markdown file intended for AI consumption.
I wrote this after the fact, and it serves more as a README than a skill/prompt.

That said, it could probably be tuned to be an effective prompt if needed by changing the general tone from a historical narrative to imperative directions. An LLM can likely help with that, too.

Process-wise, I went the scrappy route, and just tossed up some quick Trello cards for the user stories, and then dove right in, steering the scope as I went.

This was in the interest of getting a lot done quickly, for a demo. In a collaborative work environment, I might spend more time in a formal planning phase, and outline specific tasks for agents or humans.

## Steps

### Planning

Again, I tried not to stew on the planning phase for too long, but I did whip myself up a basic guide to keep myself on track:

1. The first thing I did was identify the key MVP requirements for this project.
2. I then tossed up a quick Trello board, with those requirements as user stories.
3. I then wrote myself some subtasks for potential implementation details pursuant to these stories.
4. As I went along, I tried to capture any ideas I had in the moment onto this board.
5. I kept the following columns, from left to right, as a rudementary board:
    - **Extras**: out of scope, wishlist items. Bonus Features if I have time.
    - **Bugs**: a dedicated column for bugs as I noticed them during development.
    - **Stories**: Critical MVP requirements outlined for this project, captured as individial user stories.
    - **Subtasks**: implementation details pursuant to the stories.
    - **In Progress**: tasks currently in flight.
    - **Subtasks Done**: completed subtasks with committed code changes.
    - **Stories Done**: completed full requirements, committed and tested.
    - **Bonus Features Done**: completed extra features.

It's not much to look at, but if you are interested, here is the board (can share on request):
> https://trello.com/b/hjTBxGlG/freight-load-board-app


### Implementation

1. First, I scaffolded a Vite app, with some basic config.

2. I then spent some time fine tuning the eslint config, vscode integration, and adding some rules I like.

3. Next, I added a precommit hook using Husky, to run the linter against staged files.

4. After that, I installed TanStack Router, set up some basic routes, and let it generate a routeTree.

5. I stopped again for a moment to add a few more eslint rules specifically around code style and accessibility.

6. At this point, I actually captured the scaffold as it stood in a separate repo, and put it up on GitHub to use as a template: 
    > https://github.com/jblossomweb/react-vite-tanstack-router-scaffold-2026
    - I may add to this later, or spin up some variations.

7. Back to the demo app, I then installed the Material UI package, to use as my primary design library, in order to save time, and deliver quality, accessible UX out of the box.

8. As part of this, I cleaned out scaffold placeholders and put together a basic layout to nest the routing into. I added a few starter pages, and a style guide for myself, to help fine tune color contrast, etc. I also built a dark mode switcher, because **I consider dark mode to be an accessibility feature**.

9. Once I was happy with the layout, I installed AG Grid to handle the table data. MUI comes with a fairly solid table component, but AG Grid tends to perform better out of the box and be more accessible by optimizing how it virtualizes. (For example, adding pagination disables virtualization) We also were moving data tables to AG Grid at Meta, so I was already a bit familar with it.

10. Armed with AG Grid, I built out the loads page, and initially just imported the `mockLoads.json` to populate it. (intent: focus on the UX first, and build out a similated API fetch later) I also built out the `SearchInput` component at this time.

11. Next, I added client-side pagination to ensure it could handle larger data sets. More testing for this came later, but I knew I would need it so this was an upfront mitigation.

#### At this point, the requirements were 90% met, and I spent time doing cleanup, optimization, and the final 10%:

12. I then took some time to do some initial testing with keyboard navigation and a screenreader, to optimize some of that UX. Again, more optimization on this came later, but this was a first pass.

13. I then took some time to refactor some of the code, abstracted a hook, and tighten some typing. Another first pass at cleanup.

14. Next I generated some larger data sets based on the `mockLoads.json` to see how far I could push the client-side pagination, search, filtering, and sorting. I was surprised to find out it performed well, beyond 10,000 records. At about 100,000 records, the rendering becomes slightly delayed, but was still very usable. It took about 1 million rows to finally get it to crash my browser. Obviously, if we were dealing with that many records, or really in any production scenario well before that threshold, I would build out server-side support for pagination, etc. Given that this was a frontend assignment, and the client-side operations performed well enough, **I chose not to do this for now**, but the effort would be reasonable if we needed to integrate this later.

15. Once I had this working, paginated AG Grid table, and some sorting and filtering that came out of the box, I went a little bit down a rabbit hole building some custom filters. Probably not necessary, but this was a demo, and I was having some fun.

16. Next I tackled some accessibility optimization again. I used the WAVE plugin for Chrome, and use it to direct my efforts toward accessible contrast colors, and centralize these in the theme.

17. I did some more abstraction along the way, being a good scout, and cleaning up as I went.

18. Next I built some handy hotkeys that I figured keyboard users would appreciate, for clearing the search, entering and exiting filters, etc.

19. I then focused on consistent behavior for elements that receive focus, so the border color is the same, and the tab stops make sense. I did some more screenreader optimization and cleanup along the way.

20. Next, after a lot of grueling screenreader testing, I wanted a quick win, so I built in the ability to collapse the left navigation drawer. This provides more horizontal screen real estate for tables. This was common practice at Meta.

#### At this point, I was mostly happy with the application, but wanted to take it a step further.

21. I then installed Storybook, and started building out stories to cover my components, starting with the `AppLayout`.

22. This made me realize I had a lot of components in a flat directory structure, so I introduced some organization, moved them into various subfolders, and added a top-down import alias to alleviate the headache of traversing up directories for imports.

23. I then cranked out the rest of the stories, and removed the style guide route, relocating it to storybook as a story case for the `AppLayout`.

24. Now I wanted some bonus features. So **I added a load details page**, and the ability to click into it from the table.

25. Once this route, page, and link was in place, I built out a map feature using MapLibre, another visualization tool we used at Meta. I threw it together quickly, but if I wanted to clean it up a bit, I might abstract some components, helpers, etc. It displays the origin and destination on a map, with a straight line. In a real world scenario, it might be helpful to lean on some highway navigation routing, but this would open pandora's box of scope creep, so I left it as is.

26. Once I was happy with that, in a similarly quick-and-dirty fashion, I added another page, linked from the main nav, to display some pie charts, and demonstrate my ability to infer and implement useful aggregate visualizations. If I had more time, I might add more aggregate stuff on this page, but you get the idea.

27. Everything looks great, and works great, but 1 last thing I wanted to do was switch from directly importing the json data to simulating an API fetch, to make it a little more realistic, and demonstrate this ability. Since I had TanStack doing the routing, it was a natural fit to use TanStack Query to handle the caching, and I built some services, hooks, and page templates for the pages that needed to fetch data.

28. Finally, I installed Vitest as a runner, and started writing some unit tests, beginning with the smaller pieces of logic in the `utils` directory. I know we talked about TDD in the context of AI, but since I dove right in and threw this together quickly, I circumvented a lot of formal planning. So for this demo project, I ended up writing tests in hindsight.

29. As a final step, I added the test runner to the Husky hook, so tests run on staged files before local commits.
