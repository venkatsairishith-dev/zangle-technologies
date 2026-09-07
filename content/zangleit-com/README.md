# zangleit.com content export

Verbatim text content of the live static site at https://zangleit.com, exported
page by page. One markdown file per page; the navigation and footer that repeat
on all 28 pages live once in `_site-chrome.md` instead of in every file.

Conventions inside each file:

- `# …` / `## …` — the page's own headings, in document order
- `[link] …` — anchor and button labels
- `![alt] …` — image alt text
- `- …` — list items

Two mechanical fixes were applied during extraction: `<br>`-separated text was
joined into one line, and headings the template splits across two `<span>`s were
merged back into a single heading (36 of them).

## Live page → React route

| live page | export | route in this app |
| --- | --- | --- |
| index.html | `index.md` | `/` |
| about-us.html | `about-us.md` | `/about` |
| careers.html | `careers.md` | `/careers` |
| case-studies.html | `case-studies.md` | `/case-studies` |
| services.html | `services.md` | `/services` |
| it-staffing.html | `it-staffing.md` | `/services/it-staffing`, `/staffing/it-staffing` |
| Clinical-Staffing.html | `clinical-staffing.md` | `/services/clinical-staffing`, `/staffing/clinical-scientific` |
| outsourcing.html | `outsourcing.md` | `/services/outsourcing`, `/staffing/outsourcing` |
| veteran-hiring.html | `veteran-hiring.md` | `/services/veteran-hiring`, `/staffing/veteran-hiring` |
| it-Consulting.html | `it-consulting.md` | `/services/it-consulting` |
| cloud-computing.html | `cloud-computing.md` | `/services/cloud-computing` |
| data-analysis.html | `data-analysis.md` | `/services/data-analysis` |
| website-development.html | `website-development.md` | `/services/website-development` |
| product-development.html | `product-development.md` | `/services/product-development` |
| business-reform.html | `business-reform.md` | `/services/business-reform` |
| infrastructure.html | `infrastructure.md` | `/services/infrastructure` |
| Healthcare.html | `healthcare.md` | `/services/healthcare` |

### Live pages with no route in this app

`our-team.md`, `locations.md`, `faq.md`, `support.md`, `blog-grid.md` (News &
Events), and the hosting range: `cloud-server.md`, `dedicated-hosting.md`,
`domain-search.md`, `reseller-package.md`, `web-hosting.md`,
`wordpress-hosting.md`.

### Routes in this app with no page on the live site

`/contact`, `/experience`, `/hire-talent`, `/jobs`, `/practice-areas`,
`/talent-bench`, `/services/engineering`, `/services/engineering-staffing`,
`/staffing`, `/staffing/engineering`.
