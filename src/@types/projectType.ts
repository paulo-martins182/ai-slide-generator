export type ProjectTypes = {
  userInputPrompt: string;
  projectId: string;
  createdAt: string;
  noOfSliders: string;
  outline: OutlineType[];
  slides: any[];
  designStyle: DesignTypes;
};

export type OutlineType = {
  slideNo: string;
  slidePoint: string;
  outline: string;
};

export interface DesignTypes {
  styleName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    gradient: string;
  };
  designGuide: string;
  icon: string;
  bannerImage: string;
}
