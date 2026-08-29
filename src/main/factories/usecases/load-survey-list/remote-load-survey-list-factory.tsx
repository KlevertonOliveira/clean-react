import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";
import type { LoadSurveyList } from "@/domain/usecases";
import { makeApiURL, makeAxiosHttpClient } from "../../http";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiURL("/surveys"), makeAxiosHttpClient());
};