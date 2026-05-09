---
name: git-auto-commit
description: 每次在回報開發、修改或重構成果給使用者之前，必須自動將當前工作區的所有改動存成一個 git 版本，commit 備註必須精確採用使用者剛剛發送的 prompt/需求文字。
---

# Git 自動備份與版本控制技能 (Git Auto Commit Skill)

本技能旨在確保使用者的每一次修改、重構或設計改動都有完整的版本紀錄。任何代理人（Agent）在完成工作並向使用者回報最終成果之前，**必須（MUST）**自動執行此技能所規範的 Git 提交。

## 執行流程 (Workflow)

當收到使用者的修改需求，且修改完成準備回報時，代理人必須依序執行以下步驟：

1. **加入所有變更檔案**：
   ```bash
   git add .
   ```

2. **建立自動備份 Commit**：
   - 提交備註必須**精確**使用使用者引發本次修改的 prompt 或需求文字。
   - 為了避免未設定 Git 使用者資訊而導致對話中斷，提交時必須顯式指定臨時使用者資訊。
   - 語法：
     ```bash
     git -c user.name="饈菓子" -c user.email="admin@shiu-guoji.com" commit -m "[使用者 prompt 文字]"
     ```

3. **回報使用者**：
   - 在回報成果時，必須同時說明已經為本次修改儲存了 Git 版本，並列出 Commit 備註文字，以供使用者核對。

## 注意事項 (Anti-Patterns)
- **嚴禁**在回報完成前忘記提交。
- **嚴禁**使用模糊的備註（如 "update files" 或 "fix bug"），必須完整採用使用者的 Prompt 作為 Commit 訊息。
- **嚴禁**在 `git commit` 中使用未處理的引號，如果使用者的 prompt 中含有引號，必須在 shell 中正確跳脫（Escape）或妥善包裹。
