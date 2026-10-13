# Grade 12 Programming — Term 1 Online Formative Assessment

**Published module, approved 2026-10-13** — 22 questions, 30 marks, 45 minutes, aligned with 7 learning objectives for Unit 12.1A.

## Launch and navigation
- On-site launch: `assessments/grade12-term1/index.html`
- External assessment engine: Google Apps Script Web App (see public launch page for URL)
- Site entry points: Grade 12 PROG Term 1 syllabus, sidebar, Assessment Hub, Wave Library lesson
- Navigation texts in English, Russian and Kazakh

## Architecture and privacy
The launch page contains no answer keys or student responses. Questions, grading logic and answer keys are kept in the teacher-owned, **private** Google Apps Script project, not the public GitHub repository. That project writes to the private teacher Google Sheet. Never publish the `Questions.gs` source in this repository. Students identify themselves by name and class without authentication, so identity cannot be independently verified.

## Verification prior to publication
- [x] 22 questions and 30 total marks verified
- [x] Google Apps Script deployed by teacher
- [x] Launch URL inserted into the public page
- [x] Student feedback and teacher Google Sheet tested with 0/30 and 6/30 submissions
- [x] Teacher explicitly approved publishing and merging to main

## Operations
To update assessment questions, grading or student UI: edit the private Apps Script project, then deploy a **new version** of the existing Web App. Keep the same `/exec` URL when updating an existing deployment. The launch page in GitHub should not need updating unless the Apps Script URL changes.

If the teacher wishes to hide the assessment, remove or disable launch links in the site and/or restrict the Google Apps Script deployment. Students can still reach a public `/exec` URL directly if only the site links are hidden.
