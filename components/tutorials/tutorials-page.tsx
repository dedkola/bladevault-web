"use client"

import { ArrowDown, ArrowUpRight, Play } from "lucide-react"
import { useState } from "react"

import {
  tutorialPlaylistUrl,
  videoTutorials,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/video-tutorials"

export function TutorialsPage() {
  const [selectedId, setSelectedId] = useState(videoTutorials[0].id)
  const selected =
    videoTutorials.find((tutorial) => tutorial.id === selectedId) ??
    videoTutorials[0]

  function selectTutorial(id: string) {
    setSelectedId(id)
    window.requestAnimationFrame(() => {
      document.querySelector(".tutorials-player")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    })
  }

  return (
    <main className="tutorials-page" id="main">
      <div className="tutorials-inner">
        <div className="tutorials-kicker">
          <span>BladeVault / How-to guides</span>
          <span className="tutorials-kicker-right">
            {videoTutorials.length} lessons · one local vault
          </span>
        </div>

        <section className="tutorials-stage" aria-labelledby="tutorials-title">
          <div className="tutorials-intro">
            <span className="tutorials-eyebrow">Learn the vault</span>
            <h1 className="tutorials-title" id="tutorials-title">
              Make it <em>yours.</em>
            </h1>
            <p className="tutorials-copy">
              Short, practical walkthroughs for setting up BladeVault, importing
              your collection, and keeping every detail useful.
            </p>
            <div className="tutorials-actions">
              <a
                className="tutorials-button tutorials-button-primary"
                href="#guide-index"
              >
                Browse all guides <ArrowDown aria-hidden="true" />
              </a>
              <a
                className="tutorials-button tutorials-button-secondary"
                href={tutorialPlaylistUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open playlist <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="tutorials-stats" aria-label="Guide library details">
              <div className="tutorials-stat">
                <strong>{videoTutorials.length}</strong>
                <span>step-by-step lessons</span>
              </div>
              <div className="tutorials-stat">
                <strong>Mac + PC</strong>
                <span>setup and everyday use</span>
              </div>
              <div className="tutorials-stat">
                <strong>Start anywhere</strong>
                <span>each guide stands alone</span>
              </div>
            </div>
          </div>

          <div className="tutorials-player">
            <div className="tutorials-player-chrome">
              <span className="tutorials-chrome-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Now playing / {selected.category}</span>
            </div>
            <div className="tutorials-player-frame">
              <iframe
                key={selected.id}
                src={youtubeEmbedUrl(selected.id)}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="tutorials-player-details">
              <div>
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
              </div>
              <a
                className="tutorials-watch-link"
                href={youtubeWatchUrl(selected.id)}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="tutorials-index"
          id="guide-index"
          aria-labelledby="index-title"
        >
          <div className="tutorials-index-heading">
            <div>
              <span className="tutorials-eyebrow">The full index</span>
              <h2 id="index-title">Choose a lesson.</h2>
            </div>
            <p>Select a card to load it in the player above.</p>
          </div>

          <div className="tutorials-grid">
            {videoTutorials.map((tutorial, index) => {
              const isSelected = tutorial.id === selected.id
              return (
                <button
                  key={tutorial.id}
                  type="button"
                  className="tutorial-card"
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={`Play ${tutorial.title}`}
                  onClick={() => selectTutorial(tutorial.id)}
                >
                  <span
                    className="tutorial-card-thumb"
                    style={{
                      backgroundImage: `url(${youtubeThumbnailUrl(tutorial.id)})`,
                    }}
                    aria-hidden="true"
                  >
                    <span className="tutorial-card-overlay" />
                    <span className="tutorial-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="tutorial-card-play">
                      <Play aria-hidden="true" />
                    </span>
                  </span>
                  <span className="tutorial-card-copy">
                    <span className="tutorial-card-category">
                      {tutorial.category}
                    </span>
                    <span className="tutorial-card-title">
                      {tutorial.title}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
