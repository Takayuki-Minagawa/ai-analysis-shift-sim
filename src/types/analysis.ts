export type IndustryAxisKey =
  | "dataVolume"
  | "automationPotential"
  | "regulationRisk"
  | "roiPotential"
  | "aiReadiness"
  | "marketGrowth";

export type IndustryScore = {
  id: string;
  industry: string;
  dataVolume: number;
  automationPotential: number;
  regulationRisk: number;
  roiPotential: number;
  aiReadiness: number;
  marketGrowth: number;
};

export type CompetitiveAxisKey =
  | "domainKnowledge"
  | "dataAccess"
  | "modelQuality"
  | "operationCapability"
  | "security"
  | "explainability"
  | "integration"
  | "costEfficiency";

export type CompanyScore = {
  id: string;
  name: string;
  type: string;
  typeKey: string;
  domainKnowledge: number;
  dataAccess: number;
  modelQuality: number;
  operationCapability: number;
  security: number;
  explainability: number;
  integration: number;
  costEfficiency: number;
};
