"""
Generates Joshua_Solomon_Resume_v5.pdf — hybrid employment-focused resume.

Visual goal: match v4's elegant typography (letter-spaced section headers,
generous hierarchy) while staying ATS-friendly (standard fonts, simple tables,
no images-of-text).

Content goal: NO 'Service Offer for Freelance Clients' pricing section.
Keeps: Summary, Core Expertise (5 categories incl. AI), Experience (2 roles
with updated bullets including A2P win + email infrastructure win + Apps
Script database). Adds a single italic freelance footer line at bottom.
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)

# ── colour palette (matches v4 + site) ────────────────────────────────────
NAVY = HexColor('#1E4D8C')
BODY = HexColor('#334155')
MUTED = HexColor('#64748B')

OUTPUT = "C:/Users/joshu/Desktop/GROWTH/portfolio_v5/public/Joshua_Solomon_Resume_v5.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=LETTER,
    leftMargin=0.6 * inch,
    rightMargin=0.6 * inch,
    topMargin=0.5 * inch,
    bottomMargin=0.45 * inch,
    title="Joshua Solomon — CRM & Automation Specialist",
    author="Joshua Solomon",
)

# ── paragraph styles ──────────────────────────────────────────────────────
# Name: large, bold, navy, letter-spaced for that v4 elegance.
name_style = ParagraphStyle(
    'Name', fontName='Helvetica-Bold', fontSize=20, leading=24,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=1,
    charSpace=2,
)
# Subtitle (role): bold, navy, slightly smaller.
title_style = ParagraphStyle(
    'Title', fontName='Helvetica-Bold', fontSize=11, leading=14,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=4,
)
# Contact line: gray, smaller, regular weight.
contact_style = ParagraphStyle(
    'Contact', fontName='Helvetica', fontSize=9, leading=12,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=2,
)
# "Open to..." availability tagline: italic, bold, navy.
availability_style = ParagraphStyle(
    'Availability', fontName='Helvetica-BoldOblique', fontSize=9, leading=12,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=10,
)
# Section header: bold navy, slightly larger, letter-spaced (the v4 look).
section_header_style = ParagraphStyle(
    'SectionHeader', fontName='Helvetica-Bold', fontSize=10.5, leading=13,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=2, spaceBefore=10,
    charSpace=2.5,
)
# Body paragraph: clean and readable.
body_style = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=9.5, leading=12.5,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=5,
)
# Job title: bold + slightly larger than body.
job_title_style = ParagraphStyle(
    'JobTitle', fontName='Helvetica-Bold', fontSize=10.5, leading=13,
    textColor=BODY,
)
# Dates: italic, muted, right-aligned.
date_style = ParagraphStyle(
    'Date', fontName='Helvetica-Oblique', fontSize=9, leading=12,
    textColor=MUTED, alignment=2,  # 2 = TA_RIGHT
)
# Company line: subtle, italic for the type, navy for the company name.
company_style = ParagraphStyle(
    'Company', fontName='Helvetica', fontSize=9.5, leading=12,
    textColor=BODY, spaceAfter=3,
)
# Bullet rows.
bullet_style = ParagraphStyle(
    'Bullet', fontName='Helvetica', fontSize=9.5, leading=12.5,
    textColor=BODY, leftIndent=12, spaceAfter=2,
)
# Final freelance availability footer.
footer_style = ParagraphStyle(
    'Footer', fontName='Helvetica-Oblique', fontSize=8.5, leading=11,
    textColor=MUTED, alignment=TA_LEFT, spaceBefore=8,
)


def section_header(text):
    """Letter-spaced section header followed by a thin navy underline."""
    return [
        Paragraph(text, section_header_style),
        HRFlowable(width="100%", thickness=0.5, color=NAVY, spaceBefore=0, spaceAfter=5),
    ]


def job_header(title, dates):
    """Job title on the left, dates italic-muted on the right (same line).
    Uses a simple 2-cell table — ATS-readable, no nested tables, no images."""
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

# ───── HEADER block ─────
story.append(Paragraph('JOSHUA RALPH ADRIAN SOLOMON', name_style))
story.append(Paragraph('CRM &amp; Automation Specialist  |  Marketing Systems Builder', title_style))
story.append(Paragraph(
    'Olongapo City, Philippines  ·  +63 961 556 2117  ·  solomonjoshua101602@gmail.com',
    contact_style,
))
story.append(Paragraph(
    'Open to Freelance Retainers &amp; Full-Time Remote Roles',
    availability_style,
))

# ───── SUMMARY ─────
story.extend(section_header('SUMMARY'))
story.append(Paragraph(
    'Marketing systems and automation specialist who builds the technical backbone agencies and '
    'service businesses actually run on. Custom-coded websites on Cloudflare, GoHighLevel CRM '
    'builds, A2P-compliant SMS, Zapier, n8n, Make, ClickUp — turning sales pipelines, lead-routing '
    'logic, and email workflows into automations that survive a busy week. Building AI-augmented '
    'pipelines with Claude + OpenAI APIs for outreach personalization and lead-scoring. Currently '
    'embedded with a US marketing agency; open to senior freelance retainers and remote employment.',
    body_style,
))

# ───── CORE EXPERTISE ─────
story.extend(section_header('CORE EXPERTISE'))
expertise = [
    (
        'CRM, SMS &amp; Automation',
        'GoHighLevel (GHL) full builds, CRM pipelines, lead routing, booking automations, '
        'GHL A2P 10DLC SMS compliance, Zapier, n8n, Make, ClickUp',
    ),
    (
        'Email, Billing &amp; Lifecycle',
        'Mailchimp, HubSpot, GHL Email, dedicated sending domains with SPF/DKIM/DMARC, '
        'newsletter systems, multi-step nurture sequences, automated invoicing &amp; '
        'billing-reminder workflows',
    ),
    (
        'Websites, Hosting &amp; SEO',
        'Custom-coded sites (HTML / CSS / JS) deployed on Cloudflare Pages; Wix Classic / Studio / Velo, '
        'WordPress, Squarespace as platform alternatives. Ongoing on-page and technical SEO + Google Search Console.',
    ),
    (
        'Technical &amp; Integrations',
        'Cloudflare DNS &amp; Pages, domain management, GHL domain connect, Square + Stripe + GHL '
        'invoicing flows, Google Apps Script back-office logic, Gmail-to-task pipelines, DistroKid distribution',
    ),
    (
        'AI &amp; LLM Integration',
        'Building AI-augmented automation workflows — Claude + OpenAI API integration in n8n &amp; Make '
        'for outreach personalization, content drafting, and lead-scoring. LLM-augmented marketing '
        'automation as a core differentiator vs no-AI agency builds.',
    ),
]
for label, items in expertise:
    story.append(Paragraph(f'<b>{label}:</b>  {items}', body_style))

# ───── EXPERIENCE ─────
story.extend(section_header('EXPERIENCE'))

# Job 1 — Arrow Group
story.append(job_header('Technical VA &amp; Web Developer', 'Feb 2026 – Present'))
story.append(Paragraph(
    '<font color="#1E4D8C"><b>Arrow Group Consulting</b></font> &mdash; Michigan, USA  ·  '
    '<i>Part-time ongoing contract</i>',
    company_style,
))
job1_bullets = [
    'Embedded technical implementer for the founder — owning the systems side of new client '
    'onboardings end to end.',
    'Built and shipped custom-coded HTML/CSS/JS websites deployed on Cloudflare Pages, plus Wix '
    'Velo extensions where platforms were the better fit.',
    'Managed Cloudflare DNS, domain go-lives, and GoHighLevel domain connections across multiple '
    'client accounts.',
    'Achieved A2P 10DLC brand approval for client SMS campaigns on GoHighLevel — the hardest GHL '
    'setup, often a blocker for agencies.',
    'Built dedicated email-sending infrastructure (separate subdomain, SPF/DKIM/DMARC aligned, '
    'SSL issued, warmup completed to 6,500 emails/day capacity) for radio-station client.',
    'Designed and shipped monthly newsletter campaigns; set up automated invoicing and '
    'back-office workflows.',
]
for b in job1_bullets:
    story.append(Paragraph(f'• {b}', bullet_style))

story.append(Spacer(1, 6))

# Job 2 — Doneverse
story.append(job_header('Virtual Marketing Assistant', 'Sep 2025 – Apr 2026'))
story.append(Paragraph(
    '<font color="#1E4D8C"><b>Doneverse</b></font> &mdash; Philippines  ·  '
    '<i>Marketing VA agency</i>',
    company_style,
))
job2_bullets = [
    'Primary technical implementer across the agency — Wix, WordPress, Squarespace, HubSpot, and '
    'Mailchimp client accounts.',
    'Built advanced GoHighLevel automations: CRM pipelines, lead-routing rules, booking funnels, '
    'and sales sequences.',
    'Designed and rolled out the agency&rsquo;s full ClickUp project management system from '
    'scratch — including Gmail-to-task automations that eliminated manual triage.',
    'Delivered Wix Studio builds and integrated Square payment processing into client checkout '
    'and intake flows.',
    'Built custom Google Apps Script back-office database for a consignment startup '
    '(multi-platform listing flow across Poshmark / eBay / Depop, live notifications to client).',
]
for b in job2_bullets:
    story.append(Paragraph(f'• {b}', bullet_style))

# ───── Footer: small italic freelance line ─────
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=0.3, color=MUTED, spaceBefore=0, spaceAfter=3))
story.append(Paragraph(
    'Also open to freelance retainers — full pricing and service tiers available on request.',
    footer_style,
))

doc.build(story)
print(f"PDF generated: {OUTPUT}")
