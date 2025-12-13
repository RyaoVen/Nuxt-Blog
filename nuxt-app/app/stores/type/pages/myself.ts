import type {techStack} from "~/stores/type/myself/techStack";
import type {LearningGoal} from "~/stores/type/myself/LearningGoal";
import type {project} from "~/stores/type/myself/project";
import type {skill} from "~/stores/type/myself/skill";
import type {Heatmap} from "~/stores/type/myself/heatmap";
import type {MyselfHeaderData} from "~/stores/type/myself/header";

export interface myself{
    techStack: techStack[];
    LearningGoal: LearningGoal[];
    project: project[];
    skill: skill[];
    heatmap: Heatmap[];
    header: MyselfHeaderData;
}