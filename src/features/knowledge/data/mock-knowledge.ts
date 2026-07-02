import { KnowledgeFolder } from "../types/knowledge";

export const mockKnowledgeBase: KnowledgeFolder[] = [
  {
    id: "f1",
    name: "SOPs",
    documents: [
      { id: "d1", title: "Client Onboarding", content: "Step 1: Send welcome email outlining next steps.\nStep 2: Set up a dedicated Google Drive folder for the client.\nStep 3: Schedule a kickoff call.\nStep 4: Grant access to the Client Portal.", updatedAt: "2 days ago" },
      { id: "d2", title: "Content Creation Workflow", content: "1. Research & Strategy\n2. Scripting & Storyboarding\n3. Filming / Asset Gathering\n4. Editing & Post-Production\n5. Internal Review\n6. Client Approval\n7. Scheduling & Posting", updatedAt: "1 week ago" }
    ]
  },
  {
    id: "f2",
    name: "Brand Guidelines",
    documents: [
      { id: "d3", title: "Pixel & Proof Brand Voice", content: "Our voice is premium, authoritative, and minimalistic. We don't use unnecessary fluff. We speak directly to ambitious agency owners and high-end brands. Confidence is key.", updatedAt: "1 month ago" },
      { id: "d4", title: "Color Palette", content: "Primary Background: Black (#0B0B0B)\nText: White & Neutral Grays\nAccent Color: Subtle Purple (#6E56CF)\n\nNever use highly saturated generic colors like pure red or pure blue.", updatedAt: "1 month ago" }
    ]
  },
  {
    id: "f3",
    name: "Templates",
    documents: [
      { id: "d5", title: "Standard Proposal Template", content: "Introduction: Who we are and why we fit.\nScope of Work: Exactly what deliverables are included.\nTimeline: Expected milestones.\nInvestment: Pricing packages.\nNext Steps: How to sign and proceed.", updatedAt: "3 weeks ago" }
    ]
  }
];
