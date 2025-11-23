# PahamHukum

This is a fantastic project idea. The legal system in Indonesia is often viewed as intimidating and complex. A website that breaks down the **RUU KUHAP (The New Criminal Procedure Code Draft)** and the existing system into digestible, interactive parts would be a massive public service.

Here is a comprehensive blueprint for building **"PahamHukum"** (a placeholder name), designed to be citizen-centric, interactive, and legally accurate based on the document you provided.

---

### **1. Core Concept & Philosophy**
*   **Goal:** To demystify the Indonesian criminal justice system.
*   **Tone:** Authoritative but empathetic, using "Plain Indonesian" (avoiding overly complex *Legalese*).
*   **Target Audience:** General citizens, students, victims of crime, and families of suspects.

---

### **2. Website Architecture (Sitemap)**

#### **A. Landing Page (The Dashboard)**
*   **Hero Section:** "Dealing with the Law? Start Here."
    *   Three big buttons: "I am a Victim," "I am a Suspect," "I am a Witness."
*   **Emergency Button (Floating):** "I just got arrested / Raided. What do I do?" (Quick checklist).
*   **Search Bar:** Smart search that understands natural language (e.g., "Can police take my phone?" leads to *Electronic Evidence* & *Seizure*).

#### **B. The Interactive Timeline ("Jalur Perkara")**
This is the heart of the website. A horizontal, scrollable timeline showing the lifecycle of a criminal case. Users click on a stage to expand details.

1.  **Report (Laporan/Pengaduan):** How to file a report, rights of the whistleblower.
2.  **Investigation (Penyidikan):** Police powers, rights during interrogation, *Restorative Justice* options (Pasal 74).
3.  **Prosecution (Penuntutan):** The role of the Jaksa, dismissal of charges.
4.  **Trial (Persidangan):** Court etiquette, cross-examination, presenting evidence.
5.  **Verdict (Putusan):** Types of verdicts (Guilty, Free, *Judicial Pardon/Pemaafan Hakim*).
6.  **Execution & Remedies:** Prison, fines, Appeal (Banding), Cassation (Kasasi).

#### **C. The "Know Your Rights" Hub**
Dedicated pages based on the specific protections mentioned in the RUU:
*   **For Suspects:** Right to remain silent, right to a lawyer, right to challenge arrest (Praperadilan).
*   **For Victims:** Restitution (Pasal 172), protection, getting updates on the case.
*   **For Vulnerable Groups (Special Feature):**
    *   *Disability:* Rights to special assistance (Pasal 137).
    *   *Women:* Protection from intimidation (Pasal 138).
    *   *Elderly:* Special health provisions (Pasal 139).

#### **D. The "RUU vs. Old KUHAP" Comparator**
A slider tool where users can see "How it was before" vs. "How it is in the New RUU."
*   *Example:* Before: Hard to settle out of court. Now: **Restorative Justice** is formalized.
*   *Example:* Before: Electronic evidence vague. Now: **Bukti Elektronik** is a primary evidence type.

---

### **3. Interactive Modules (The "Cool" Features)**

#### **1. "The Virtual Lawyer" (AI Chatbot)**
*   **Function:** Users ask questions in everyday language.
*   **Data Source:** The PDF you uploaded + current regulations.
*   **Example Query:** "Polisi minta password HP saya, boleh gak?"
*   **Answer:** "Under the new RUU (Pasal 105 & 228), police can seize electronic evidence, but they usually need a warrant from the court unless it's urgent. You have the right to ask for their warrant (Surat Izin Penyitaan)."

#### **2. "Eligible for Restorative Justice?" Calculator**
*   **Logic:** A simple quiz based on **Pasal 75**.
    *   *Q1: Is this your first offense?* (Yes/No)
    *   *Q2: Is the crime terrorism, corruption, or against state security?* (Yes/No)
    *   *Q3: Have you compensated the victim?* (Yes/No)
    *   *Result:* "You are likely eligible for Restorative Justice. Here is how to apply."

#### **3. The "Evidence Checker"**
*   Users learn what counts as valid evidence.
*   *Interactive Element:* Drag and drop items into a "Court Bag."
    *   *Item:* "A rumor I heard." -> *Rejected (Hearsay).*
    *   *Item:* "CCTV footage." -> *Accepted (Pasal 31).*
    *   *Item:* "WhatsApp Chat." -> *Accepted (Dokumen Elektronik).*

#### **4. Document Generator**
*   Templates for common legal needs:
    *   Request for a Lawyer (Permohonan Bantuan Hukum).
    *   Request for Suspension of Detention (Penangguhan Penahanan).
    *   Pra-peradilan application draft.

---

### **4. Design & UX Strategy**

*   **Mobile First:** Most Indonesians access the web via phones. The site must be fast and responsive.
*   **Visual Dictionary:** Whenever a hard word appears (e.g., *Terepisir*, *Inkracht*, *Restitusi*), it should be underlined. Hovering over it shows a simple definition.
*   **Color Coding:**
    *   **Red:** Urgent/Warning (Rights being violated).
    *   **Green:** Rights/Permissions.
    *   **Blue:** Informational/Process steps.

---

### **5. Technical Implementation (For Developers)**

*   **Frontend:** Next.js or React (for snappy interaction).
*   **Content Management:** Sanity.io or Strapi (Headless CMS) so legal experts can update content without coding.
*   **Search:** Algolia (for fast, typo-tolerant searching of legal terms).
*   **Hosting:** Vercel or Netlify (Fast delivery in SE Asia).

---

### **6. Draft Content Example (For a Web Page)**

**Page Title: Can I Settle Out of Court? (Keadilan Restoratif)**

> **What is it?**
> Instead of going to prison, the perpetrator and the victim agree to solve the problem peacefully. The perpetrator fixes the damage, and the victim forgives.
>
> **When is it allowed? (Pasal 75)**
> ✅ You are a first-time offender.
> ✅ The victim agrees to forgive.
> ✅ Damages have been paid/repaired.
>
> **When is it NOT allowed? (Pasal 77)**
> ❌ Drug dealing.
> ❌ Corruption.
> ❌ Terrorism.
> ❌ Crimes against national security.
>
> **How to start?**
> You can apply for this at the Police stage (Penyidikan) or Prosecution stage (Penuntutan). Download the *Application Template* below.

---

### **7. Potential Partners**
To give the site credibility, you could partner with:
*   LBH (Lembaga Bantuan Hukum).
*   University Law Faculties (UI, UGM, etc.).
*   ICJR (Institute for Criminal Justice Reform).

Would you like me to write the code for one of these specific components (like the Restorative Justice Calculator logic or the Landing Page structure)?
