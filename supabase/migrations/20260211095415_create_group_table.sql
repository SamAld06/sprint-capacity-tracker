CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    groupcode TEXT NOT NULL UNIQUE,
    groupname TEXT NOT NULL UNIQUE,
    creator TEXT NOT NULL,
    grouphashedpassword TEXT NOT NULL,
    UNIQUE(groupcode, groupname)
);

ALTER TABLE public.workprogress
DROP constraint workprogress_groupcode_sprintid_fkey;

ALTER TABLE public.workprogress
ADD constraint workprogress_groupcode_fkey
FOREIGN KEY (groupcode)
REFERENCES public.groups(groupcode)
ON DELETE CASCADE;

ALTER TABLE public.workprogress
ADD constraint workprogress_sprintid_fkey
FOREIGN KEY (groupCode, sprintid)
REFERENCES public.sprint(groupCode, sprintid)
ON DELETE CASCADE;

ALTER TABLE public.capacity
DROP constraint capacity_groupcode_sprintid_fkey;

ALTER TABLE public.capacity
ADD constraint capacity_groupcode_fkey
FOREIGN KEY (groupcode)
REFERENCES public.groups(groupcode)
ON DELETE CASCADE;

ALTER TABLE public.capacity
ADD constraint capacity_sprintid_fkey
FOREIGN KEY (groupcode, sprintid)
REFERENCES public.sprint(groupcode, sprintid)
ON DELETE CASCADE;

ALTER TABLE public.sprint
ADD constraint sprint_groupcode_fkey
FOREIGN KEY (groupcode)
REFERENCES public.groups(groupCode)
ON DELETE CASCADE;

ALTER TABLE public.groupmember
ADD constraint groupmember_groupcode_fkey
FOREIGN KEY (groupcode)
REFERENCES public.groups(groupcode)
ON DELETE CASCADE;
