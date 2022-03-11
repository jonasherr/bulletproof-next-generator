import { useMutation } from "react-query";
import { MutationConfig } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";
import { supabase } from "@/lib/initSupabase";
import { Team } from "@/features/teams";

export type UpdateTeamDTO = {
  teamId: string;
  data: {
    name: string;
    description: string;
  };
};

export const updateTeam = async ({ teamId, data }: UpdateTeamDTO) => {
  const { data: updatedTeam } = await supabase
    .from<Team>("team")
    .update(data)
    .match({ id: teamId });

  if (updatedTeam === null) throw Error();

  return updatedTeam[0];
};

type UseUpdateTeamOptions = {
  config?: MutationConfig<typeof updateTeam>;
};

export const useUpdateTeam = ({ config }: UseUpdateTeamOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    ...config,
    mutationFn: updateTeam,
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "Profile Updated",
      });
    },
  });
};
