# Wedding Invitation

A responsive digital wedding invitation built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Push this project to the `invitation-card` repository.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. The included workflow at `.github/workflows/deploy.yml` will build and publish the site.
5. Your URL will be `https://YOUR-GITHUB-USERNAME.github.io/invitation-card/`.

> `vite.config.js` uses `/invitation-card/` as the base path. If you rename the repository, update `base`.

## Replace invitation artwork

Replace:
- `public/images/wedding-cover.jpeg`
- `public/images/wedding-details.jpeg`

Keep the same filenames, or update the image paths in `src/App.jsx`.

## Music

The invitation includes a generated, original ambient instrumental loop at `public/music/wedding-ambience.wav`. Browsers only start audio after the visitor taps **Open invitation**. The sound button can mute/unmute it at any time.

## Personalization updates

- Added the supplied Bismillah header artwork above the invitation.
- Updated the welcome copy for a Muslim Nikah and Walima celebration.
- Removed the personalized addressee field from the cover artwork.
- Removed the personal salutation/groom address line and guest-name lists from the details artwork.

## Social sharing (Open Graph)

`index.html` includes Open Graph and Twitter/X metadata. Before publishing, replace
`YOUR-GITHUB-USERNAME` in the `og:image`, `og:url`, and `twitter:image` tags with
the GitHub account username that owns the Pages site. The preview image is the
wedding cover image. Social platforms may cache previews after the first share.
