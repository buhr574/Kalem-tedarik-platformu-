const PasswordStrength = ({ password }) => {
  const calculateStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };

    Object.values(checks).forEach((check) => {
      if (check) strength++;
    });

    if (strength <= 2) {
      return { strength, label: "Zayıf", color: "bg-red-500" };
    } else if (strength <= 3) {
      return { strength, label: "Orta", color: "bg-yellow-500" };
    } else if (strength <= 4) {
      return { strength, label: "İyi", color: "bg-blue-500" };
    } else {
      return { strength, label: "Güçlü", color: "bg-green-500" };
    }
  };

  const getRequirements = (password) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };
  };

  if (!password) return null;

  const { strength, label, color } = calculateStrength(password);
  const requirements = getRequirements(password);
  const percentage = (strength / 5) * 100;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${color.replace('bg-', 'text-')}`}>
          {label}
        </span>
      </div>

      {/* Requirements List */}
      <div className="space-y-1 text-xs">
        <div className={`flex items-center gap-2 ${requirements.length ? 'text-green-400' : 'text-gray-400 dark:text-gray-300'}`}>
          <svg
            className={`w-3 h-3 ${requirements.length ? 'text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {requirements.length ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
          <span>En az 8 karakter</span>
        </div>
        <div className={`flex items-center gap-2 ${requirements.lowercase ? 'text-green-400' : 'text-gray-400 dark:text-gray-300'}`}>
          <svg
            className={`w-3 h-3 ${requirements.lowercase ? 'text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {requirements.lowercase ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
          <span>Küçük harf (a-z)</span>
        </div>
        <div className={`flex items-center gap-2 ${requirements.uppercase ? 'text-green-400' : 'text-gray-400 dark:text-gray-300'}`}>
          <svg
            className={`w-3 h-3 ${requirements.uppercase ? 'text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {requirements.uppercase ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
          <span>Büyük harf (A-Z)</span>
        </div>
        <div className={`flex items-center gap-2 ${requirements.number ? 'text-green-400' : 'text-gray-400 dark:text-gray-300'}`}>
          <svg
            className={`w-3 h-3 ${requirements.number ? 'text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {requirements.number ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
          <span>Rakam (0-9)</span>
        </div>
        <div className={`flex items-center gap-2 ${requirements.special ? 'text-green-400' : 'text-gray-400 dark:text-gray-300'}`}>
          <svg
            className={`w-3 h-3 ${requirements.special ? 'text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {requirements.special ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
          <span>Özel karakter (!@#$% vb.)</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;



