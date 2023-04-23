import { DiagramData } from "./diagram-data.interface";
/**
 * Interface for the data that is used to compare the diagram.
 */
export interface DiagramDataCompare {
  /** first Diagram */
	one: DiagramData[],
  /** second Diagram */
	two: DiagramData[]
}
