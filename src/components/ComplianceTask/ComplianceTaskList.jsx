import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { showAllComplianceTasks } from "../../services/complianceTaskService";
import ComplianceTaskCard from "../ComplianceTaskCard/ComplianceTaskCard";

