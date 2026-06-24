#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Structure tests for agent-first SharePoint Embedded docs.

Validates that every doc is shaped for AI-agent grounding:
  - required front matter (title, slug, persona, scenario_ids, source_of_truth, ...)
  - valid persona + https source_of_truth
  - body has H1 == title, a blockquote blurb, and an "Agent task:" line
  - all relative markdown links resolve to a real file/dir
  - llms.txt lists every doc and every listed link exists

Pure stdlib, no dependencies. Exits non-zero if any ERROR is found (CI-friendly).
Run:  python test_doc_structure.py
"""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
REQUIRED_FM = ["title", "slug", "persona", "scenario_ids", "source_of_truth", "last_verified", "agent_ready"]
VALID_PERSONA = {"developer", "admin", "all"}
NO_FM_OK = {"README.md", "AGENT-FIRST-STANDARD.md"}  # support files, not agent docs
NO_LINK_CHECK = {"AGENT-FIRST-STANDARD.md"}          # meta doc with illustrative example links

errors, warnings = [], []
def err(f, m): errors.append((f, m))
def warn(f, m): warnings.append((f, m))

def rel(p): return os.path.relpath(p, ROOT).replace("\\", "/")

def parse_front(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.S)
    if not m:
        return None, text
    fm = {}
    for line in m.group(1).splitlines():
        mm = re.match(r"^([A-Za-z][\w.\-]*):\s*(.*)$", line)
        if mm:
            fm[mm.group(1)] = mm.group(2).strip()
    return fm, m.group(2)

LINK = re.compile(r"(!?)\[[^\]]*\]\(([^)]+)\)")
def check_links(path, text):
    base = os.path.dirname(path)
    in_code = False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_code = not in_code; continue
        if in_code:
            continue
        for _, target in LINK.findall(line):
            t = target.strip()
            if not t or t.startswith(("http://", "https://", "#", "mailto:", "tel:")):
                continue
            tt = t.split("#")[0]
            if not tt:
                continue
            dest = os.path.normpath(os.path.join(base, tt))
            if not os.path.exists(dest):
                err(rel(path), f"broken relative link -> {t}")

md_files = [p for p in glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True)
            if ".github" not in p]
agent_slugs = set()

for path in sorted(md_files):
    name = os.path.basename(path)
    text = open(path, encoding="utf-8").read()
    fm, body = parse_front(text)
    if name not in NO_LINK_CHECK:
        check_links(path, text)

    if fm is None:
        if name not in NO_FM_OK:
            err(rel(path), "missing front matter block")
        continue

    # required keys
    for k in REQUIRED_FM:
        if k not in fm:
            err(rel(path), f"front matter missing '{k}'")
    # persona
    if fm.get("persona") not in VALID_PERSONA:
        err(rel(path), f"persona '{fm.get('persona')}' not in {sorted(VALID_PERSONA)}")
    # source_of_truth
    if not fm.get("source_of_truth", "").startswith("https://"):
        err(rel(path), "source_of_truth is not an https URL")
    # agent_ready
    if fm.get("agent_ready", "").lower() != "true":
        warn(rel(path), "agent_ready is not true")
    if "slug" in fm:
        agent_slugs.add(fm["slug"])

    # body shape
    h1 = re.search(r"^#\s+(.+)$", body, re.M)
    if not h1:
        err(rel(path), "no H1 heading in body")
    elif "title" in fm and h1.group(1).strip() != fm["title"].strip():
        warn(rel(path), f"H1 != title ('{h1.group(1).strip()}' vs '{fm['title'].strip()}')")
    if not re.search(r"^>\s+\S", body, re.M):
        warn(rel(path), "missing blockquote blurb (> ...)")
    if "**Agent task:**" not in body:
        err(rel(path), "missing '**Agent task:**' line")
    if not re.search(r"^##\s+\S", body, re.M):
        warn(rel(path), "no '## ' section headings")

# llms.txt integrity
llms = os.path.join(ROOT, "llms.txt")
if not os.path.exists(llms):
    warn("llms.txt", "no manifest in this branch (ok for a partial/subset branch)")
else:
    txt = open(llms, encoding="utf-8").read()
    if not txt.lstrip().startswith("# "):
        warn("llms.txt", "should start with a '# ' title")
    listed = set()
    for m in re.finditer(r"^- \[[^\]]+\]\(([^)]+)\)", txt, re.M):
        link = m.group(1).split("#")[0]
        listed.add(link[:-3] if link.endswith(".md") else link)
        dest = os.path.normpath(os.path.join(ROOT, link))
        if not os.path.exists(dest):
            err("llms.txt", f"links to missing file -> {link}")
    # every agent doc should be discoverable from the manifest
    for slug in sorted(agent_slugs):
        if slug not in listed:
            warn("llms.txt", f"agent doc not listed in manifest: {slug}")

# report
print(f"Scanned {len(md_files)} markdown files under {rel(ROOT) or '.'}\n")
for f, m in errors:
    print(f"  ERROR  {f}: {m}")
for f, m in warnings:
    print(f"  warn   {f}: {m}")
print(f"\n{'='*52}")
print(f"  {len(errors)} error(s), {len(warnings)} warning(s)")
if errors:
    print("  STRUCTURE TESTS FAILED")
    sys.exit(1)
print("  STRUCTURE TESTS PASSED")
sys.exit(0)
