"""
Generates Joshua_Solomon_Resume_v5.pdf — hybrid employment-focused resume.

Removes the "Service Offer for Freelance Clients" section from the v4 PDF.
Updates Core Expertise to match current site (CRM/SMS/Automation, Email/Lifecycle,
Websites/Hosting/SEO, Technical/Integrations). Adds A2P + email infrastructure
wins to the Arrow Group bullets. Adds a tiny italic freelance footer.
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)

# ── colours match the site ───────────────────────────────────────────────
NAVY = HexColor('#1E4D8C')
BODY = HexColor('#334155')
MUTED = HexColor('#64748B')

OUTPUT = "C:/Users/joshu/Desktop/GROWTH/portfolio_v5/public/Joshua_Solomon_Resume_v5.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=LETTER,
    leftMargin=0.55 * inch,
    rightMargin=0.55 * inch,
    topMargin=0.4 * inch,
    bottomMargin=0.35 * inch,
    title="Joshua Solomon — CRM & Automation Specialist",
    author="Joshua Solomon",
)

# ── paragraph styles ─────────────────────────────────────────────────────
name_style = ParagraphStyle(
    'Name', fontName='Helvetica-Bold', fontSize=18, leading=22,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=1,
)
title_style = ParagraphStyle(
    'Title', fontName='Helvetica-Bold', fontSize=10.5, leading=13,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=4,
)
contact_style = ParagraphStyle(
    'Contact', fontName='Helvetica', fontSize=8.5, leading=11,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=1,
)
availability_style = ParagraphStyle(
    'Availability', fontName='Helvetica-Bold', fontSize=8.5, leading=11,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=6,
)
section_header_style = ParagraphStyle(
    'SectionHeader', fontName='Helvetica-Bold', fontSize=9.5, leading=12,
    textColor=NAVY, alignment=TA_LEFT, spaceAfter=2, spaceBefore=6,
)
body_style = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=9, leading=12,
    textColor=BODY, alignment=TA_LEFT, spaceAfter=4,
)
job_title_style = ParagraphStyle(
    'JobTitle', fontName='Helvetica-Bold', fontSize=10, leading=12,
    textColor=BODY,
)
date_style = ParagraphStyle(
    'Date', fontName='Helvetica-Oblique', fontSize=8.5, leading=11,
    textColor=MUTED, alignment=2,  # right
)
company_style = ParagraphStyle(
    'Company', fontName='Helvetica', fontSize=9, leading=11,
    textColor=BODY, spaceAfter=3,
)
bullet_style = ParagraphStyle(
    'Bullet', fontName='Helvetica', fontSize=8.75, leading=11.5,
    textColor=BODY, leftIndent=11, spaceAfter=1.5,
)
footer_style = ParagraphStyle(
    'Footer', fontName='Helvetica-Oblique', fontSize=8.5, leading=11,
    textColor=MUTED, alignment=TA_LEFT, spaceBefore=6,
)


def section_header(text):
    """Section header + thin navy rule."""
    return [
        Paragraph(text, section_header_style),
        HRFlowable(width="100%", thickness=0.5, color=NAVY, spaceBefore=0, spaceAfter=4),
    ]


def job_header(title, dates):
    """Job title left + dates right, in a borderless table."""
    t = Table(
        [[Paragraph(title, job_title_style), Paragraph(dates, date_style)]],
        colWidths=[5.2 * inch, 2.1 * inch],
    )
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return t


# ── content ──────────────────────────────────────────────────────────────
story = []

# HEADER block
story.append(Paragraph('JOSHUA RALPH ADRIAN SOLOMON', name_style))
story.append(Paragraph('CRM &amp; Automation Specialist  |  Marketing Systems Builder', title_style))
story.append(Paragraph(
    'Olongapo City, Philippines · +63 961 556 2117 · solomonjoshua101602@gmail.com',
    contact_style,
))
story.append(Paragraph(
    '<i>Open to Freelance Retainers &amp; Full-Time Remote Roles</i>',
    availability_style,
))

# SUMMARY
story.extend(section_header('SUMMARY'))
story.append(Paragraph(
    'Marketing systems and automation specialist who builds the technical backbone agencies and '
    'service businesses actually run on. Custom-coded websites on Cloudflare, GoHighLevel CRM '
    'builds, A2P-compliant SMS, Zapier, n8n, Make, ClickUp — turning sales pipelines, lead-routing '
    'logic, and email workflows into automations that survive a busy week. Currently embedded with '
    'a US marketing agency; open to senior freelance retainers and remote employment.',
    body_style,
))

# CORE EXPERTISE
story.extend(section_header('CORE EXPERTISE'))
expertise = [
    (
        'CRM, SMS &amp; Automation:',
        'GoHighLevel (GHL) full builds, CRM pipelines, lead routing, booking automations, '
        'GHL A2P 10DLC SMS compliance, Zapier, n8n, Make, ClickUp',
    ),
    (
        'Email, Billing &amp; Lifecycle:',
        'Mailchimp, HubSpot, GHL Email, dedicated sending domains with SPF/DKIM/DMARC, '
        'newsletter systems, multi-step nurture sequences, automated invoicing &amp; '
        'billing-reminder workflows',
    ),
    (
        'Websites, Hosting &amp; SEO:',
        'Custom-coded sites (HTML / CSS / JS) deployed on Cloudflare Pages; Wix Classic / Studio / Velo, '
        'WordPress, Squarespace as platform alternatives. Ongoing on-page and technical SEO + Google Search Console.',
    ),
    (
        'Technical &amp; Integrations:',
        'Cloudflare DNS &amp; Pages, domain management, GHL domain connect, Square + Stripe + GHL '
        'invoicing flows, Google Apps Script back-office logic, Gmail-to-task pipelines, DistroKid distribution',
    ),
]
for label, items in expertise:
    story.append(Paragraph(f'<b>{label}</b>  {items}', body_style))

# EXPERIENCE
story.extend(section_header('EXPERIENCE'))

# Job 1 — Arrow Group
story.append(job_header('Technical VA &amp; Web Developer', 'Feb 2026 – Present'))
story.append(Paragraph(
    '<font color="#1E4D8C"><b>Arrow Group Consulting</b></font> — Michigan, USA  ·  '
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
    '<font color="#1E4D8C"><b>Doneverse</b></font> — Philippines  ·  <i>Marketing VA agency</i>',
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
    'Built custom Google Apps Script back-office database for a consignment startup (multi-platform '
    'listing flow across Poshmark / eBay / Depop, live notifications to client).',
]
for b in job2_bullets:
    story.append(Paragraph(f'• {b}', bullet_style))

# Small freelance footer (replaces old Service Offer section)
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=0.3, color=MUTED, spaceBefore=0, spaceAfter=4))
story.append(Paragraph(
    '<i>Also open to freelance retainers — full pricing and service tiers available on request.</i>',
    footer_style,
))

doc.build(story)
print(f"PDF generated: {OUTPUT}")
