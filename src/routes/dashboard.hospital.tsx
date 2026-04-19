import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, Stethoscope, Plus, Trash2, LogOut, Mail, ShieldCheck, AlertTriangle, Map, Edit2, Ban, Download } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { useI18n } from "@/lib/i18n";
import { useFacilities } from "@/hooks/useFacilities";
import { usePatients } from "@/hooks/usePatients";
import { addDepartment, addDoctor, deleteDoctor, updateDoctor, type Facility } from "@/lib/hospitals";
import { clearHospitalSession, getHospitalSession, registerDoctorEmail } from "@/lib/hospitalAuth";
import { decryptVault } from "@/lib/triage";

export const Route = createFileRoute("/dashboard/hospital")({
  head: () => ({ meta: [{ title: "Hospital dashboard — NivaranAI" }] }),
  component: HospitalDashboard,
});

function HospitalDashboard() {
  const navigate = useNavigate();
  const facilities = useFacilities();
  const allPatients = usePatients();
  const [facilityId, setFacilityId] = useState<string | null>(null);

  useEffect(() => {
    const id = getHospitalSession();
    if (!id) {
      navigate({ to: "/login/hospital" });
      return;
    }
    setFacilityId(id);
  }, [navigate]);

  const facility = facilities.find((f) => f.id === facilityId);

  if (!facilityId) return null;

  if (!facility) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-5 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold">Facility not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your facility record may have been removed. Please contact admin.
          </p>
          <Link
            to="/login/hospital"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Back to login
          </Link>
        </main>
      </div>
    );
  }

  if (facility.status !== "approved") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-5 py-16">
          <div className="rounded-3xl border border-warning/30 bg-warning/10 p-6 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-warning" />
            <h1 className="font-display mt-3 text-2xl font-semibold">Awaiting approval</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your facility is currently{" "}
              <span className="font-semibold capitalize text-foreground">{facility.status}</span>.
              You'll be able to manage departments and doctors once approved.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const logout = () => {
    clearHospitalSession();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" /> Hospital portal
            </div>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {facility.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {facility.type} · {facility.location} · {facility.contact}
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:bg-secondary"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>

        <EpidemicRadar allPatients={allPatients} />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <DepartmentsPanel facility={facility} />
          <DoctorsPanel facility={facility} />
        </div>
      </main>
    </div>
  );
}

function EpidemicRadar({ allPatients }: { allPatients: any[] }) {
  // Group by location AND primary symptom category
  const clusters = allPatients.reduce((acc, p) => {
    let loc = p.location || "Bhopal";
    const pincodeMatch = String(loc).match(/\b\d{6}\b/);
    if (pincodeMatch) loc = pincodeMatch[0]; // strictly apply 6-digit pin code

    const title = p.main_symptom?.toLowerCase() || "";
    const symptom = title.includes("fever") ? "Fever" :
      title.includes("cough") ? "Respiratory" : null;
    if (symptom) {
      const key = `${loc}|${symptom}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
    }
    return acc;
  }, {} as Record<string, any[]>);

  // Find outbreaks (threshold 5+)
  const outbreaks = Object.entries(clusters)
    .filter(([_, patients]: [string, any]) => patients.length >= 5)
    .map(([key, patients]: [string, any]) => {
      const [loc, symptom] = key.split("|");
      return { loc, symptom, count: patients.length, patients };
    });

  if (outbreaks.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 shadow-soft animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-2 text-destructive mb-3">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-display font-semibold tracking-tight">AI Epidemic Radar</h3>
      </div>

      {/* Epidemic Heatmap Visualization Grid */}
      <div className="mb-5 p-4 bg-background rounded-xl border border-destructive/20 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/10 to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3 relative z-10">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Live Pincode Heatmap</p>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-destructive animate-pulse">
            <span className="h-2 w-2 rounded-full bg-destructive"></span> Live Tracking
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 relative z-10">
          {Array.from(new Set(["462001", "462002", "462003", "462016", "462021", "462022", "462023", "462024", ...outbreaks.map(o => o.loc)])).slice(0, 10).map((zone) => {
            const outbreak = outbreaks.find(o => o.loc === zone);
            return (
              <div key={zone} className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-mono border transition-all ${outbreak ? 'bg-destructive text-destructive-foreground border-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse scale-105 z-10' : 'bg-secondary/40 text-muted-foreground border-border/50 opacity-60'
                }`}>
                <span className="font-bold">{zone}</span>
                {outbreak ? (
                  <span className="mt-1 bg-background text-destructive px-1.5 py-0.5 rounded-full text-[10px] shadow-sm">{outbreak.count} {outbreak.symptom}</span>
                ) : (
                  <span className="mt-1 text-[9px] opacity-40">Clear</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {outbreaks.map((ob, idx) => (
          <div key={idx} className="flex flex-col gap-3 bg-background border border-destructive/30 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive">🚨 Possible outbreak detected</p>
                <p className="text-xs text-muted-foreground">{ob.symptom} cases increasing in {ob.loc} ({ob.count} recent cases)</p>
              </div>
            </div>

            <div className="mt-2 rounded-lg border border-border/50 divide-y divide-border/50 bg-secondary/10">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-secondary/30 rounded-t-lg">
                Patient Details & Contact Tracing
              </div>
              {ob.patients.map((p: any, pIdx: number) => (
                <div key={pIdx} className="px-3 py-2 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-medium text-foreground">{decryptVault(p.patient_name)}</span>
                    <span className="ml-2 text-muted-foreground">Age: {p.patient_age}</span>
                  </div>
                  <span className="tabular-nums font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {p.patient_phone || "No phone"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DepartmentsPanel({ facility }: { facility: Facility }) {
  const [name, setName] = useState("");
  const isClinic = facility.type === "Clinic";
  const locked = isClinic && facility.departments.length >= 1;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold">Departments</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {isClinic
          ? "Clinics support a single department."
          : "Add as many specialties as you offer."}
      </p>

      <div className="mt-4 space-y-1.5">
        {facility.departments.map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
          >
            {d.name}
          </div>
        ))}
        {facility.departments.length === 0 && (
          <p className="text-xs text-muted-foreground">No departments yet.</p>
        )}
      </div>

      {!locked && (
        <div className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cardiology"
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => {
              if (!name.trim()) return;
              addDepartment(facility.id, name.trim());
              setName("");
              toast.success("Department added");
            }}
            className="inline-flex items-center gap-1 rounded-xl bg-foreground px-3 py-2 text-xs font-medium text-background hover:bg-mineral"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      )}
    </div>
  );
}

function DoctorsPanel({ facility }: { facility: Facility }) {
  const [doc, setDoc] = useState({
    name: "",
    specialty: "",
    departmentId: "",
    room: "",
    room: "",
    email: "",
  });
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", specialty: "", room: "", departmentId: "" });
  const [blacklistDocId, setBlacklistDocId] = useState<string | null>(null);
  const [blacklistForm, setBlacklistForm] = useState({ reason: "", type: "temporary" as "none" | "temporary" | "permanent" });

  const isClinic = facility.type === "Clinic";
  const locked = isClinic && facility.doctors.length >= 1;

  const submit = () => {
    if (!doc.name.trim() || !doc.departmentId || !doc.email.trim()) {
      toast.error("Name, department, and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doc.email.trim())) {
      toast.error("Enter a valid email.");
      return;
    }
    addDoctor(facility.id, {
      name: doc.name.trim(),
      specialty: doc.specialty.trim() || "General Physician",
      departmentId: doc.departmentId,
      room: doc.room.trim() || undefined,
    });
    registerDoctorEmail(doc.email.trim());
    toast.success(`Doctor added`, {
      description: `${doc.email.trim()} can now log in as a doctor.`,
    });
    setDoc({ name: "", specialty: "", departmentId: "", room: "", email: "" });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold">Doctors</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Doctors can log in only if their email is registered here.
      </p>

      <div className="mt-4 space-y-1.5">
        {facility.doctors.map((d) => {
          const dept = facility.departments.find((x) => x.id === d.departmentId);
          const isEditing = editingDocId === d.id;
          const isBlacklisting = blacklistDocId === d.id;

          return (
            <div
              key={d.id}
              className={`flex flex-col gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${d.blacklistStatus && d.blacklistStatus !== 'none' ? 'bg-destructive/5 border-destructive/20' : 'border-border bg-background'}`}
            >
              {!isEditing && !isBlacklisting ? (
                <div className="flex items-center justify-between">
                  <div>
                     <div className="flex items-center gap-1.5">
                        <span className={`font-medium ${d.blacklistStatus && d.blacklistStatus !== 'none' ? 'text-destructive line-through' : ''}`}>{d.name}</span>
                        {d.blacklistStatus && d.blacklistStatus !== "none" && (
                           <span className="text-[9px] uppercase font-bold tracking-wider text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-sm">{d.blacklistStatus} BLOCKED</span>
                        )}
                     </div>
                    <div className="text-xs text-muted-foreground">
                      {d.specialty} · {dept?.name ?? "—"} {d.room ? `· ${d.room}` : ""}
                    </div>
                    {d.email && <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1 opacity-70"><Mail className="h-2.5 w-2.5" /> {d.email}</div>}
                    {d.blacklistReason && <div className="text-xs text-destructive mt-0.5 opacity-80">Reason: {d.blacklistReason}</div>}
                    {d.status === "pending" && (
                      <div className="mt-3 border-t border-border pt-2 pb-1">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Verification Documents</p>
                        <div className="flex gap-2">
                          {d.degreeFile && (
                             <a href={d.degreeFile} download={`Degree_${d.name.replace(/\\s+/g, "_")}.pdf`} className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md hover:bg-border transition-colors"><Download className="h-3 w-3" /> Degree</a>
                          )}
                          {d.licenseFile && (
                             <a href={d.licenseFile} download={`License_${d.name.replace(/\\s+/g, "_")}.pdf`} className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md hover:bg-border transition-colors"><Download className="h-3 w-3" /> License</a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {d.status === "pending" ? (
                       <button
                         onClick={() => {
                            updateDoctor(facility.id, d.id, { status: "approved" });
                            if (d.email) registerDoctorEmail(d.email);
                            toast.success("Doctor approved");
                         }}
                         className="rounded-md px-2 py-1 bg-primary/10 font-bold text-[10px] uppercase tracking-wider text-primary hover:bg-primary/20"
                       >
                         Approve
                       </button>
                    ) : ( 
                       <button
                         onClick={() => { setEditingDocId(d.id); setBlacklistDocId(null); setEditForm({ name: d.name, specialty: d.specialty, room: d.room || "", departmentId: d.departmentId }) }}
                         className="rounded-md p-1 font-medium hover:bg-secondary text-muted-foreground"
                       >
                         <Edit2 className="h-3.5 w-3.5" />
                       </button>
                    )}
                    {d.blacklistBy === "admin" ? (
                       <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/10 px-2 py-1 rounded">Admin Lock</span>
                    ) : (
                       <>
                       {d.status !== "pending" && (
                          <button
                            onClick={() => { setBlacklistDocId(d.id); setEditingDocId(null); setBlacklistForm({ reason: d.blacklistReason || "", type: d.blacklistStatus && d.blacklistStatus !== 'none' ? d.blacklistStatus : "temporary" }) }}
                            className="rounded-md p-1 font-medium hover:bg-secondary text-muted-foreground"
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                       )}
                       <button
                         onClick={() => {
                           if (confirm(`Remove ${d.name}?`)) {
                             deleteDoctor(facility.id, d.id);
                             toast.message("Doctor removed");
                           }
                         }}
                         className="rounded-md p-1 text-destructive hover:bg-destructive/10"
                       >
                         <Trash2 className="h-3.5 w-3.5" />
                       </button>
                       </>
                    )}
                  </div>
                </div>
              ) : isEditing ? (
                 <div className="flex flex-col gap-1.5 pt-1">
                    <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="rounded text-xs border border-border px-2 py-1.5" />
                    <div className="flex gap-1.5">
                       <input value={editForm.specialty} onChange={e => setEditForm({...editForm, specialty: e.target.value})} className="rounded text-xs border border-border px-2 py-1.5 flex-1" />
                       <input value={editForm.room} onChange={e => setEditForm({...editForm, room: e.target.value})} className="rounded text-xs border border-border px-2 py-1.5 w-24" />
                    </div>
                    <div className="flex justify-end gap-1.5 mt-1">
                       <button onClick={() => setEditingDocId(null)} className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground hover:bg-secondary rounded-lg">Cancel</button>
                       <button onClick={() => { updateDoctor(facility.id, d.id, editForm); setEditingDocId(null); toast.success("Doctor updated") }} className="px-3 py-1.5 text-[10px] uppercase font-bold bg-foreground text-background rounded-lg">Save</button>
                    </div>
                 </div>
              ) : (
                 <div className="flex flex-col gap-1.5 pt-1">
                    <p className="text-xs font-semibold text-destructive">Block / Blacklist Doctor</p>
                    <select value={blacklistForm.type} onChange={e => setBlacklistForm({...blacklistForm, type: e.target.value as any})} className="rounded-lg text-xs border border-destructive/20 bg-destructive/5 px-2 py-2 outline-none">
                       <option value="none">Active (Remove Block)</option>
                       <option value="temporary">Temporary Block</option>
                       <option value="permanent">Permanent Blacklist</option>
                    </select>
                    {blacklistForm.type !== "none" && (
                      <input placeholder="Reason for blocking..." value={blacklistForm.reason} onChange={e => setBlacklistForm({...blacklistForm, reason: e.target.value})} className="rounded-lg text-xs border border-destructive/20 bg-destructive/5 px-2 py-2 outline-none" />
                    )}
                    <div className="flex justify-end gap-1.5 mt-1">
                       <button onClick={() => setBlacklistDocId(null)} className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground hover:bg-secondary rounded-lg">Cancel</button>
                       <button onClick={() => { updateDoctor(facility.id, d.id, { blacklistStatus: blacklistForm.type, blacklistBy: blacklistForm.type === 'none' ? undefined : 'hospital', blacklistReason: blacklistForm.type === 'none' ? undefined : blacklistForm.reason }); setBlacklistDocId(null); toast.success("Status changed") }} className="px-3 py-1.5 text-[10px] uppercase font-bold bg-destructive text-destructive-foreground rounded-lg">{blacklistForm.type === 'none' ? 'Unblock' : 'Apply Block'}</button>
                    </div>
                 </div>
              )}
            </div>
          );
        })}
        {facility.doctors.length === 0 && (
          <p className="text-xs text-muted-foreground">No doctors yet.</p>
        )}
      </div>

      {!locked && facility.departments.length > 0 ? (
        <div className="mt-4 grid gap-2">
          <input
            value={doc.name}
            onChange={(e) => setDoc({ ...doc, name: e.target.value })}
            placeholder="Dr. Name"
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={doc.specialty}
              onChange={(e) => setDoc({ ...doc, specialty: e.target.value })}
              placeholder="Specialty"
              className="rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <input
              value={doc.room}
              onChange={(e) => setDoc({ ...doc, room: e.target.value })}
              placeholder="Room / OPD"
              className="rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            value={doc.departmentId}
            onChange={(e) => setDoc({ ...doc, departmentId: e.target.value })}
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Select department</option>
            {facility.departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={doc.email}
              onChange={(e) => setDoc({ ...doc, email: e.target.value })}
              placeholder="Doctor email (required for login)"
              className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={submit}
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-foreground px-3 py-2 text-xs font-medium text-background hover:bg-mineral"
          >
            <Plus className="h-3.5 w-3.5" /> Add doctor
          </button>
        </div>
      ) : facility.departments.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground">
          Add at least one department before adding doctors.
        </p>
      ) : null}
    </div>
  );
}
