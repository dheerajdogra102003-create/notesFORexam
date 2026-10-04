# LINUX ADMINISTRATION — EXAM PREPARATION NOTES

# UNIT 1 — LINUX ARCHITECTURE & FILESYSTEM

---

## Question 1: Describe the Linux Filesystem Hierarchy Standard (FHS) and the purpose of core root directories.

### Answer
The **Filesystem Hierarchy Standard (FHS)** defines the directory structure and directory contents in Linux distributions, ensuring standard locations for files and tools.

```
/ (Root Directory)
├── bin       -> Essential user binaries (ls, cp, bash, cat)
├── sbin      -> Essential system administrator binaries (fdisk, reboot, iptables)
├── etc       -> Host-specific system-wide configuration files (passwd, fstab, hosts)
├── home      -> User personal home directories (/home/user/)
├── root      -> Home directory for the root superuser
├── var       -> Variable runtime data (logs: /var/log, mail, web: /var/www)
├── tmp       -> Temporary files (often cleared at reboot)
├── dev       -> Device node special files (/dev/sda, /dev/null, /dev/urandom)
├── proc      -> Virtual pseudo-filesystem exposing kernel state and process metrics
├── sys       -> Modern unified kernel object and hardware device tree
└── usr       -> Secondary user hierarchy (usr/bin, usr/lib, usr/local/bin)
```

#### Purpose of Critical Directories:
- **/etc**: Stores plain-text system configuration files. Examples: `/etc/passwd` (user database), `/etc/fstab` (static filesystem mount table), `/etc/hosts` (static DNS overrides).
- **/var**: Holds files that change during system operation. Key subdirectories include `/var/log` for system logs (`journalctl`, `auth.log`, `syslog`).
- **/proc**: Not a physical disk directory, but a RAM-resident pseudo-filesystem generated dynamically by the Linux kernel. For instance, `/proc/cpuinfo` shows CPU hardware and `/proc/meminfo` shows live RAM metrics.
- **/dev**: Contains character and block device nodes allowing software to interact with hardware via unix file I/O operations (e.g., `/dev/null` discarding input, `/dev/sda` representing storage disks).

---

## Question 2: Explain Linux File Permissions, ownership models, and demonstrate chmod, chown, and umask.

### Answer

#### 1. File Permission Model
Every file and directory in Linux has an owner user, an owner group, and three distinct permission triads:
- **r (Read)**: Value `4`. Read file contents; list directory contents.
- **w (Write)**: Value `2`. Modify file contents; create or delete files inside a directory.
- **x (Execute)**: Value `1`. Run file as a program/script; enter (`cd`) and access files inside a directory.

Permissions display in `ls -l` as a 10-character string:
```text
- rwx r-x r--   1   nitin   students   4096   Oct 4 05:30   script.sh
│ └── └── └──
│  │   │   └── Others (World) : r-- (4)
│  │   └────── Group          : r-x (4+1 = 5)
│  └────────── Owner (User)   : rwx (4+2+1 = 7)
└───────────── File Type (- = regular file, d = directory, l = symlink)
```

#### 2. Changing Permissions with `chmod`
- **Numeric Mode (Octal)**:
  ```bash
  chmod 754 script.sh    # Owner: rwx (7), Group: r-x (5), Others: r-- (4)
  chmod 644 config.conf   # Owner: rw- (6), Group: r-- (4), Others: r-- (4)
  ```
- **Symbolic Mode**:
  ```bash
  chmod u+x script.sh     # Add execute permission to user/owner
  chmod g-w file.txt      # Remove write permission from group
  chmod o=r document.pdf  # Set others permission to read-only
  chmod -R 755 /var/www   # Recursively apply permissions to folder
  ```

#### 3. Ownership Management with `chown` & `chgrp`
```bash
# Change owner to 'alice'
chown alice script.sh

# Change owner to 'alice' and group to 'devs'
chown alice:devs script.sh

# Change group only
chgrp devs script.sh
```

#### 4. The `umask` (User Mask)
- **Concept**: Specifies default permissions stripped when new files or directories are created.
- **Base Permissions**:
  - Regular files base: `666` (`rw-rw-rw-`)
  - Directories base: `777` (`rwxrwxrwx`)
- **Calculation**: Effective Permission = Base Permission & ~umask (or Base minus umask).
  - Default typical umask: `022`
  - Created file: `666 - 022 = 644` (`-rw-r--r--`)
  - Created directory: `777 - 022 = 755` (`drwxr-xr-x`)

---

# UNIT 2 — PROCESSES & SYSTEM SERVICES

---

## Question 3: Explain Process Management in Linux. Contrast ps, top, and kill commands, and define process states.

### Answer

#### 1. Linux Process States
Every process in Linux lifecycle transitions through defined states:
- **R (Running / Runnable)**: Process is executing on CPU or waiting in the run queue.
- **S (Interruptible Sleep)**: Process is waiting for an event, hardware I/O, or signal.
- **D (Uninterruptible Sleep)**: Waiting for disk I/O; cannot be interrupted by signals.
- **Z (Zombie / Defunct)**: Process finished execution, but parent has not read its exit status with `wait()`.
- **T (Stopped / Traced)**: Paused by user (e.g. `Ctrl+Z` or `SIGSTOP`).

#### 2. Process Monitoring and Control Tools

| Tool | Purpose | Key Flags & Usage |
| :--- | :--- | :--- |
| **`ps`** | Snapshot of current processes | `ps aux` (shows all processes with CPU/MEM usage), `ps -ef` (standard UNIX view) |
| **`top` / `htop`** | Real-time interactive resource monitor | Displays real-time CPU, load average, RAM, swap, and top resource consumers. |
| **`kill`** | Send a termination signal to a PID | `kill -15 <PID>` (graceful `SIGTERM`), `kill -9 <PID>` (forceful `SIGKILL`) |
| **`pkill` / `killall`** | Terminate process by name | `pkill -u student nginx` |

#### 3. Common Linux Signals
- `SIGHUP (1)`: Hangup; reload configuration without terminating.
- `SIGINT (2)`: Interrupt from keyboard (`Ctrl+C`).
- `SIGTERM (15)`: Graceful software termination signal (allows cleanup).
- `SIGKILL (9)`: Immediate unconditional termination by kernel (cannot be caught or ignored).

---

# UNIT 3 — BASH SHELL SCRIPTING

---

## Question 4: Write a Bash shell script illustrating conditional statements, command-line arguments, and loops.

### Answer

```bash
#!/bin/bash
# ==========================================================
# Script: backup_manager.sh
# Purpose: Demonstrates arguments, conditionals, and loops
# ==========================================================

# Check if at least one argument was passed
if [ $# -lt 1 ]; then
    echo "Usage: $0 <target_directory>"
    exit 1
fi

TARGET_DIR="$1"
BACKUP_DIR="./backups"

# Verify directory existence
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' does not exist."
    exit 2
fi

# Create backup directory if needed
mkdir -p "$BACKUP_DIR"

echo "=== Starting Backup Process for: $TARGET_DIR ==="

COUNT=0
# Loop through all text files in target directory
for FILE in "$TARGET_DIR"/*.txt; do
    # Verify file exists to handle empty match
    if [ -f "$FILE" ]; then
        BASENAME=$(basename "$FILE")
        cp "$FILE" "$BACKUP_DIR/${BASENAME}.bak"
        echo "Backed up: $BASENAME"
        COUNT=$((COUNT + 1))
    fi
done

echo "=== Completed! Total files backed up: $COUNT ==="
exit 0
```
