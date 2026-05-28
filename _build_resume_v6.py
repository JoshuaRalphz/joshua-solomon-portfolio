"""
Generates Joshua_Solomon_Resume_v6.pdf — Implementation Specialist resume.

Source of truth: GROWTH/Joshua_Solomon_Resume_v6_content.md
Driven by: GROWTH/claude_code_resume_v6_build_prompt.md

Key changes from v5:
  - Title:  "Implementation Specialist — CRM, Web & Marketing Systems"
  - Arrow Group: new bullet about custom-built internal SaaS platform
    (Vercel + Vite + Firebase + Anthropic + GHL/Canva/Sheets APIs)
  - Doneverse: title → "Marketing Implementation Specialist"
    (drops ClickUp mention — that was Arrow Group, not Doneverse)
    (adds Kajabi + LinkedIn outreach)
  - NEW third experience block: Freelance / Self-employed
  - NEW Selected Projects section
  - NEW Education / Continuous Learning section
  - NEW Availability section

Hard rules:
  - Modern sans-serif (Helvetica — ATS-friendly equivalent of Inter)
  - NEVER "Virtual Assistant" anywhere
  - First-person voice, no "we / our team"
  - No emojis
  - One to two pages max — keep tight

Outputs (two destinations so the file is available both to the live site
AND on Josh's desktop for direct upload to job platforms):
  - portfolio_v5/public/Joshua_Solomon_Resume_v6.pdf  (serves /resume download)
  - C:/Users/joshu/Desktop/GROWTH/Joshua_Solomon_Resume_v6.pdf  (desktop copy)
"""

import shutil
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle,
    KeepTogether,
)

# ── color palette ─── exact match to solomonjoshua.com brand ──────────────
NAVY = HexColor('#0F4C81')   # site primary navy
BODY = HexColor('#334155')   # site body text
MUTED = HexColor('#64748B')  # site muted text

PRIMARY_OUTPUT = "C:/Users/joshu/Desktop/GROWTH/portfolio_v5/public/Joshua_Solomon_Resume_v6.pdf"
DESKTOP_COPY = "C:/Users/joshu/Desktop/GROWTH/Joshua_Solomon_Resume_v6.pdf"

doc = SimpleDocTemplate(
    PRIMARY_OUTPUT,
    pagesize=LETTER,
    leftMargin=0.6 * inch,
    rightMargin=0.6 * inch,
    topMargin=0.5 * inch,
    bottomMargin=0.45 * inch,
    title="Joshua Solomon — Implementation Specialist",
    author="Joshua Solomon",
)

# ── paragraph styles ──────────────────────────────────────────────────────
name_style = ParagraphStyle(
    'Name', fontName='Helvetica-Bold', fontSize=20, leading=24,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=1, charSpace=2,
)
title_style = ParagraphStyle(
    'Title', fontName='Helvetica-Bold', fontSize=11, leading=14,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=4,
)
contact_style = ParagraphStyle(
    'Contact', fontName='Helvetica', fontSize=9, leading=12,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=2,
)
availability_tagline_style = ParagraphStyle(
    'AvailabilityTagline', fontName='Helvetica-BoldOblique', fontSize=9, leading=12,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=10,
)
section_header_style = ParagraphStyle(
    'SectionHeader', fontName='Helvetica-Bold', fontSize=10.5, leading=13,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=2, spaceBefore=10,
    charSpace=2.5,
)
body_style = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=9.5, leading=12.5,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=5,
)
job_title_style = ParagraphStyle(
    'JobTitle', fontName='Helvetica-Bold', fontSize=10.5, leading=13,
    textColor=BODY,
)
date_style = ParagraphStyle(
    'Date', fontName='Helvetica-Oblique', fontSize=9, leading=12,
    textColor=MUTED, alignment=2,
)
company_style = ParagraphStyle(
    'Company', fontName='Helvetica', fontSize=9.5, leading=12,
    textColor=BODY, spaceAfter=3,
)
bullet_style = ParagraphStyle(
    'Bullet', fontName='Helvetica', fontSize=9.5, leading=12.5,
    textColor=BODY, leftIndent=12, spaceAfter=2,
)
project_title_style = ParagraphStyle(
    'ProjectTitle', fontName='Helvetica-Bold', fontSize=9.5, leading=12.5,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=1,
)


def section_header(text):
    return [
        Paragraph(text, section_header_style),
        HRFlowable(width="100%", thickness=0.5, color=NAVY, spaceBefore=0, spaceAfter=5),
    ]


def job_header(title, dates):
    t = Table(
        [[Paragraph(title, job_title_style), Paragraph(dates, date_style)]],
        colWidths=[5.2 * inch, 2.1 * inch],
    )
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    return t


# ── content ───────────────────────────────────────────────────────────────
story = []

# ───── HEADER ─────
story.append(Paragraph('JOSHUA RALPH ADRIAN SOLOMON', name_style))
story.append(Paragraph(
    'Implementation Specialist  &mdash;  CRM, Web &amp; Marketing Systems',
    title_style,
))
story.append(Paragraph(
    'Olongapo City, Philippines  &middot;  Open to remote (US business hours)  &middot;  '
    '+63 961 556 2117  &middot;  '
    '<a href="mailto:solomonjoshua101602@gmail.com" color="#0F4C81">solomonjoshua101602@gmail.com</a>',
    contact_style,
))
story.append(Paragraph(
    '<a href="https://solomonjoshua.com" color="#0F4C81"><b>solomonjoshua.com</b></a>  &middot;  '
    '<a href="https://www.linkedin.com/in/joshua-solomon" color="#0F4C81">LinkedIn</a>  &middot;  '
    '<a href="https://github.com/JoshuaRalphz" color="#0F4C81">GitHub</a>',
    contact_style,
))
story.append(Paragraph(
    'Open to Full-Time Remote, Contract, or Fractional Retainer Engagements',
    availability_tagline_style,
))

# ───── PROFESSIONAL SUMMARY ─────
story.extend(section_header('PROFESSIONAL SUMMARY'))
story.append(Paragraph(
    'Implementation specialist with 2+ years of agency experience configuring GoHighLevel CRMs, '
    'building custom-coded sites on Cloudflare Pages, and shipping marketing automation systems '
    'across Mailchimp, Kajabi, HubSpot, and n8n. Recently architected an internal SaaS platform '
    '(Vite + Firebase + multiple API integrations) replacing ClickUp for a US-based consultancy. '
    'Strong fit for roles spanning marketing technology implementation, technical client onboarding, '
    'or full-stack systems work for early-stage and SMB companies.',
    body_style,
))

# ───── TECHNICAL SKILLS ─────
story.extend(section_header('TECHNICAL SKILLS'))
skills = [
    (
        'CRM &amp; Marketing Platforms',
        'GoHighLevel (GHL), HubSpot, Mailchimp, Kajabi, ActiveCampaign',
    ),
    (
        'Web Development',
        'HTML5, CSS3, JavaScript, React, Vite, Tailwind CSS, Wix Studio + Velo, WordPress, Squarespace',
    ),
    (
        'Hosting &amp; DevOps',
        'Cloudflare Pages, Cloudflare DNS, Vercel, Firebase, GitHub Actions',
    ),
    (
        'Workflow Automation',
        'n8n, Make.com, Zapier, Anthropic Claude API, Google Sheets API, Canva API, GHL API',
    ),
    (
        'Compliance &amp; Integrations',
        'A2P 10DLC SMS registration, Square Payment integration, '
        'dedicated sending domain configuration (SPF/DKIM/DMARC)',
    ),
    (
        'Languages',
        'English (fluent, professional), Filipino (native)',
    ),
]
for label, items in skills:
    story.append(Paragraph(f'<b>{label}:</b>  {items}', body_style))

# ───── PROFESSIONAL EXPERIENCE ─────
story.extend(section_header('PROFESSIONAL EXPERIENCE'))

# Job 1 — Arrow Group (current)
story.append(job_header(
    'Implementation Specialist &mdash; CRM, Web &amp; Marketing Systems',
    'Sep 2025 &ndash; Present',
))
story.append(Paragraph(
    '<font color="#0F4C81"><b>Arrow Group Consulting</b></font> &mdash; Michigan, USA  &middot;  '
    '<i>Part-time ongoing contract</i>',
    company_style,
))
job1_bullets = [
    'Technical lead for client onboarding — owning the full implementation stack '
    '(GoHighLevel configuration, custom-coded sites, domain go-lives, A2P 10DLC '
    'compliance) end-to-end across multiple accounts.',
    'Built and shipped custom-coded HTML/CSS/JS websites deployed on Cloudflare Pages, '
    'plus Wix Velo extensions for platforms requiring client self-edit access.',
    'Configured GoHighLevel sub-accounts per client — automations, business profiles, '
    'dedicated sending domains, email service connections — and managed Cloudflare '
    'DNS across the portfolio.',
    '<b>Built AGC HUB</b> — a custom internal PWA unifying the agency\'s scattered '
    'tools (Drive, ClickUp, Trello, GHL, Canva) into one platform. Runs the end-to-end '
    'content production workflow: task assignment &rarr; team submission &rarr; review '
    'via GHL + Canva APIs &rarr; PM scheduling. Stack: React + Vite + Firebase + '
    'GHL/Canva/Google Sheets APIs. In daily production.',
    'Designed and shipped monthly email marketing campaigns and lifecycle automations; '
    'reported analytics from email and SMS blasts directly to founder and clients.',
    'Acted as the technical advisor to both clients and the founder — translating '
    'implementation details into plain language during onboarding calls and answering '
    'live technical questions.',
    'Coordinated with the project manager and social media manager to keep onboarding '
    'timelines on track; handled invoicing and back-office workflows.',
]
for b in job1_bullets:
    story.append(Paragraph(f'&bull; {b}', bullet_style))

story.append(Spacer(1, 6))

# Job 2 — Doneverse
story.append(job_header(
    'Marketing Implementation Specialist',
    'Sep 2025 &ndash; Present',
))
story.append(Paragraph(
    '<font color="#0F4C81"><b>Doneverse</b></font> &mdash; Philippines  &middot;  '
    '<i>Marketing services agency</i>',
    company_style,
))
job2_bullets = [
    'Primary technical implementer across the agency — built and configured client '
    'accounts on Wix Studio, Kajabi, Mailchimp, and HubSpot.',
    'Delivered Wix Studio sites with integrated Square payment processing for client '
    'checkout and intake flows.',
    'Configured Kajabi course platforms and shipped Mailchimp/HubSpot email marketing '
    'systems for SMB clients.',
    'Ran LinkedIn outreach campaigns on behalf of clients — connection note writing, '
    'multi-touch follow-up sequences, lead nurturing through to booked discovery calls.',
    'Owned client onboarding for new platform setups, including domain configuration '
    'and email deliverability setup.',
]
for b in job2_bullets:
    story.append(Paragraph(f'&bull; {b}', bullet_style))

# ───── SELECTED PROJECTS (NEW in v6) ─────
story.extend(section_header('SELECTED PROJECTS'))

projects = [
    (
        'AGC HUB &mdash; Internal Agency PWA (Arrow Group)',
        'Custom PWA unifying the agency\'s scattered tools (Drive, ClickUp, Trello, '
        'GHL, Canva) into one platform. Runs the end-to-end content production '
        'workflow: task assignment, team submission, review via GHL + Canva APIs, '
        'PM scheduling. Stack: React + Vite + Firebase + GHL/Canva/Google Sheets APIs.',
    ),
    (
        'n8n + Claude Lead Generation Pipeline (personal)',
        'Daily-cron RSS scraper across 10 job boards, multi-provider email enrichment '
        '(Hunter &rarr; Snov &rarr; Apollo fallback chain), AI-personalized cold email '
        'drafting via Claude Sonnet, GHL CRM sync. Self-hosted on DigitalOcean.',
    ),
    (
        'solomonjoshua.com (personal portfolio)',
        'React + Vite + Tailwind on Cloudflare Pages. Auto-deploys from GitHub on push. '
        'Custom quiz planner, services page, contact form posting to GHL webhook.',
    ),
]
for title, desc in projects:
    story.append(KeepTogether([
        Paragraph(title, project_title_style),
        Paragraph(desc, body_style),
    ]))

# ───── EDUCATION ─────
story.extend(section_header('EDUCATION'))

# Degree 1 — Gordon College (BS Computer Science)
story.append(job_header(
    'Bachelor of Science in Computer Science',
    '2021 &ndash; 2025',
))
story.append(Paragraph(
    '<font color="#0F4C81"><b>Gordon College</b></font> &mdash; Olongapo City, Philippines',
    company_style,
))
edu1_bullets = [
    '<i>Thesis:</i> "DevPath: Bridging Students to Learning Opportunities through '
    'On-Demand Webinars and Certifications."',
    '<i>Published at IRCITE 2025</i> &mdash; Bulacan State University.',
]
for b in edu1_bullets:
    story.append(Paragraph(f'&bull; {b}', bullet_style))

story.append(Spacer(1, 6))

# Degree 2 — Columban College (Senior High School)
story.append(job_header(
    'Senior High School &mdash; TVL ICT Track',
    '2019 &ndash; 2021',
))
story.append(Paragraph(
    '<font color="#0F4C81"><b>Columban College Inc.</b></font> &mdash; Olongapo City, Philippines  &middot;  '
    '<i>Graduated With High Honors</i>',
    company_style,
))

# ───── AVAILABILITY ─────
story.extend(section_header('AVAILABILITY'))
availability_points = [
    'Open to full-time remote roles, contract roles, or fractional retainer arrangements.',
    'US business hours preferred (currently overlaps EST/CST/MST/PST).',
    'Comfortable communicating directly with founders and senior stakeholders.',
    'Strong written communication for async-first teams.',
]
for point in availability_points:
    story.append(Paragraph(f'&bull; {point}', bullet_style))

# ── build PDF ─────────────────────────────────────────────────────────────
doc.build(story)
print(f"PDF generated: {PRIMARY_OUTPUT}")

# Copy to desktop for easy upload to job platforms
shutil.copy(PRIMARY_OUTPUT, DESKTOP_COPY)
print(f"Desktop copy:  {DESKTOP_COPY}")
